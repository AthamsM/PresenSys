import Classes from "../Classes";
import Card from "../../Components/Card";
import { useEffect, useState } from "react";
import API from "../../Controller/Api";
import { Bar } from "react-chartjs-2";
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function Dashboard(){

  const [classes, setClasses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFouls, setTotalFouls] = useState(0);
  const cards = [

    {
      "title":"Turmas",
      "value":classes.length,
      "image":"icons/class-blue.svg",
    },
    {
      "title":"Alunos",
      "value":totalStudents,
      "image":"icons/user-blue.svg",
    },
    {
      "title":"Faltas do mês",
      "value":totalFouls,
      "image":"icons/calendar-blue.svg",
    },
    {
      "title":"Frequência média",
      "value":totalFouls==0 ? "100%" : ((100-(totalFouls/(totalStudents*getPreviousBusinessDays()))*100)).toFixed(1)+"%",
      "image":"icons/trend-up-blue.svg",
    }
  ];

  const year = new Date().getFullYear();
  const [studentsMostFouls, setStudentsMostFouls] = useState([]);
  const [foulsPerMonth, setFoulsPerMonth] = useState([]);
  const [classesMostFouls, setClassesMostFouls] = useState([]);
  const labelsMonth = ["jan", "fev", "mar", "abr", "maio", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const labelsMonthFull = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const calculateTotalStudents = (data) => {

    let total = 0;
    data.forEach(item => {
        
      total += item._count.students;
    });
    setTotalStudents(total);

  } 

  const calculateTotalFols = (data) => {

    let total = 0;
    data.forEach(item => {
        
      total += item.foul;
    });
    setTotalFouls(total);
  } 
  
  function getPreviousBusinessDays() {

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0 = Janeiro, 1 = Fevereiro, etc.
    const currentDay = today.getDate();

    let businessDays = 0;

    // Loop do dia 1 até o dia de today
    for (let day = 1; day <= currentDay; day++) {

      const dataAnalysis = new Date(currentYear, currentMonth, day);
      const dayWeek = dataAnalysis.getDay();

      // 0 = Domingo, 6 = Sábado
      // Se NÃO for sábado e NÃO for domingo, é dia útil
      if (dayWeek !== 0 && dayWeek !== 6) {
        businessDays++;
      }
    }
    return businessDays;
  }

  function generateColor(id, transparency) {

    const hue = 180 + ((id * 137.508) % 170);
    return `hsl(${hue}, 60%, 50%, ${transparency})`;
  
  }

  useEffect(()=>{

    API.get("/class ").then(response => {
      
      setClasses(response.data);
      calculateTotalStudents(response.data);

    }).catch(error=>{

      console.log(error);
    });

    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const startDay = 1;
    const endDay = new Date().getDate();

    API.get(`/reports/foul-all?startDate=${year}-${month}-${startDay}&endDate=${year}-${month}-${endDay}`).then(response=>{
      //console.log(response.data); um monstro esse retorno, fi
      calculateTotalFols(response.data.data);
      
    }).catch(error=>{

      console.log(error);
    });

  },[]);

  useEffect(() => {

    API.get(`/charts/students-most-fouls/${year}`).then(response => {
      
      setStudentsMostFouls(response.data);

    }).catch(error=>{

      console.log(error);

    });

  },[]);

  useEffect(() => {

    API.get(`/charts/fouls-per-month/${year}`).then(response => {
      
      setFoulsPerMonth(response.data);

    }).catch(error=>{

      console.log(error);

    });

  },[]);

  useEffect(() => {

    API.get(`/charts/classes-most-fouls/${year}`).then(response => {
      
      setClassesMostFouls(response.data);

    }).catch(error=>{

      console.log(error);

    });

  },[]);

  return(

    <div className="grid gap-y-[2rem]">
      
      <div className="grid gap-y-[1rem] divide-y-[0.138rem] divide-[#99A1AF]/10">

        <h1 className="text-2xl font-bold text-[#023580]">Visão geral durante o mês</h1>
        
        <div className="flex justify-around gap-x-[1rem] text-[#263238]/90 w-full overflow-y-hidden overflow-x-scroll md:overflow-hidden scrollbar-thumb-[#155DDD]/80 scrollbar-track-[#99A1AF]/10 scrollbar-thin snap-x">
          {
            cards.map((e, index)=>(<Card image={e.image} title={e.title} value={e.value} key={index} className="bg-[#DBEAFE]/50 rounded-lg flex-none md:flex scale-85 sm:scale-100  animate-scale-in-center [--animation-duration:0.33s] snap-center"/>))
          }
        </div>

      </div>

      <div className="grid gap-y-[1rem] divide-y-[0.138rem] divide-[#99A1AF]/10"> 

        <h1 className="text-2xl font-bold text-[#023580]">Visão geral durante o ano</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">

          <div className="flex flex-col justify-start items-start bg-[#DBEAFE]/50 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/80"> 

            <h1 className="p-[0.5rem] w-full text-center text-[0.99rem] sm:text-[1.1rem] font-bold text-[#263238]/90">Faltas durante os meses do ano</h1>

            {foulsPerMonth &&

              <Line className="p-[1rem] max-h-[20rem]"
                options= {{
                  responsive: true, 
                  maintainAspectRatio: false, 
                  plugins: {
                    legend: {display: false}, 
                    tooltip: {titleFont: {size: 15, weight: "bold"}, bodyFont: {size: 14, weight: "bold"}, callbacks: {title: (con) => {return labelsMonthFull[foulsPerMonth[con[0].dataIndex].mnt - 1]}}}
                  }, 
                  scales: { 
                    x: { beginAtZero: true, ticks: {precision: 0, color: "#263238", font: {size: 14, weight: "bold"}}, grid: {display: true, color: "#99A1AF"}}, 
                    y: { ticks: {autoSkip: false, color: "#263238", font: {size: 14 ,weight: "bold"}}, grid: {display: true, color: "#99A1AF"}},
                  }
                }}
                data={{
                  labels: foulsPerMonth.map(fouls => labelsMonth[fouls.mnt - 1]),
                  datasets: [{
                    fill: true,
                    label: "Faltas",
                    data: foulsPerMonth.map(fouls => fouls.fouls),
                    backgroundColor: "#155DDD90",
                    borderColor: "#155DDD",
                    borderRadius: 6,
                    barThickness: 24,
                  },]
                }}
              />
            }

          </div>

          <div className="flex flex-col justify-start items-start bg-[#DBEAFE]/50 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/80"> 

            <h1 className="p-[0.5rem] w-full text-center text-[0.99rem] sm:text-[1.1rem] font-bold text-[#263238]/90">Alunos com mais faltas durante o ano</h1>

            {studentsMostFouls &&

              <Bar className="p-[1rem] max-h-[20rem]"
                options= {{
                  indexAxis: "y",
                  responsive: true, 
                  maintainAspectRatio: false, 
                  plugins: {
                    legend: {display: false}, 
                    tooltip: {titleFont: {size: 15, weight: "bold"}, bodyFont: {size: 14, weight: "bold"}, callbacks: {title: (con) => {return studentsMostFouls[con[0].dataIndex].student.name}}},
                  }, 
                  scales: { 
                    x: { beginAtZero: true, ticks: {precision: 0, color: "#263238", font: {weight: "bold"}}, grid: {display: true, color: "#99A1AF"}}, 
                    y: { ticks: {autoSkip: false, color: "#263238", font: {size: 14 ,weight: "bold"}}, grid: {display: false}}
                  }
                }}
                data={{
                  labels: studentsMostFouls.map(mostFouls => mostFouls.student.name.split(" ")[0]),
                  datasets: [{
                    label: "Faltas",
                    data: studentsMostFouls.map(mostFouls => mostFouls.fouls),
                    backgroundColor: studentsMostFouls.map(mostFouls => generateColor(mostFouls.fouls, 0.8)),
                    borderRadius: 6,
                    borderWidth: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.8,
                  },]
                }}
              />
            }

          </div>

          <div className="flex flex-col justify-start items-start bg-[#DBEAFE]/50 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/80"> 

            <h1 className="p-[0.5rem] w-full  text-center text-[0.975rem] sm:text-[1.1rem] font-bold text-[#263238]/90">Turmas com mais faltas durante o ano</h1>

            {classesMostFouls &&

              <Pie className="p-[1rem] max-h-[20rem]"
                options= {{
                  responsive: true, 
                  maintainAspectRatio: true, 
                  plugins: {
                    legend: {
                      position: "left", align: "center",
                      labels: {font: {size:14, weight: "bold"}, color: "#263238"},
                    }, 
                    tooltip: {
                      titleFont: {size: 15, weight: "bold"}, 
                      bodyFont: {size: 14, weight: "bold"}, 
                      callbacks: {
                        title: (con) => {
                          return (
                            classesMostFouls[con[0].dataIndex].class.grade +
                            " " +
                            classesMostFouls[con[0].dataIndex].class.name
                          );
                        }
                      }
                    },
                  }
                }}
                data={{
                  labels: classesMostFouls.map(mostFouls => (mostFouls.class.grade + " " + mostFouls.class.name)),
                  datasets: [{
                    label: "Faltas",
                    data: classesMostFouls.map(mostFouls => mostFouls.fouls),
                    backgroundColor: classesMostFouls.map(mostFouls => generateColor(mostFouls.fouls, 0.5)),
                    borderColor: classesMostFouls.map(mostFouls => generateColor(mostFouls.fouls, 0.8)),
                    borderWidth: 2,
                  },]
                }}
              />
            }

          </div>

        </div>

      </div>

    </div>

  );
}