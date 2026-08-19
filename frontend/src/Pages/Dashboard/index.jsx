import Classes from "../Classes";
import Card from "../../Components/Card";
import { useEffect, useState } from "react";
import API from "../../Controller/Api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(){

  const [classes, setClasses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFouls, setTotalFouls] = useState(0);

  const year = new Date().getFullYear();
  const [studentsMostFouls, setStudentsMostFouls] = useState([]);

  const calculateTotalStudents = (data)=>{

    let total = 0;
    data.forEach(item => {
        
      total += item._count.students;
    });
    setTotalStudents(total);

  } 

  const calculateTotalFols = (data)=>{

    let total = 0;
    data.forEach(item => {
        
      total += item.foul;
    });
    setTotalFouls(total);
  } 
  
  const cards = [

    {
      "title":"Turmas",
      "value":classes.length,
      "image":"icons/class.svg",
    },
    {
      "title":"Alunos",
      "value":totalStudents,
      "image":"icons/user.svg",
    },
    {
      "title":"Faltas do mês",
      "value":totalFouls,
      "image":"icons/calendar.svg",
    },
    {
      "title":"Frequência média",
      "value":totalFouls==0 ? "100%" : ((100-(totalFouls/(totalStudents*getPreviousBusinessDays()))*100)).toFixed(1)+"%",
      "image":"icons/trend-up.svg",
    }
  ];
  
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

  useEffect(()=>{

    API.get("/class ").then(response=>{
      
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

    API.get(`/charts/students-most-fouls/${year}`).then(response=>{
      
      setStudentsMostFouls(response.data);

    }).catch(error=>{

      console.log(error);

    });

  },[]);

  return(

    <div className="grid gap-y-[2rem]">
      
      <div className="grid gap-y-[1rem]">

        <h1 className="text-2xl font-bold text-[#023580]">Visão geral das turmas durante o mês</h1>
        
        <div className="flex justify-around gap-x-[1rem] w-full overflow-y-hidden overflow-x-scroll md:overflow-hidden">
          {
            cards.map((e, index)=>(<Card image={e.image} title={e.title} value={e.value} key={index} className="bg-[#DBEAFE]/50 rounded-lg flex-none md:flex [--animation-duration:0.33s] animate-scale-in-center "/>))
          }
        </div>

      </div>

      <div className="grid gap-y-[1rem]"> 

        <h1 className="text-2xl font-bold text-[#023580]">Visão geral das turmas durante o ano</h1>
        
        <div className="grid grid-cols-2">

          <div className=" flex flex-col justify-start items-start bg-[#DBEAFE]/50 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/80"> 

            <h1 className="p-[0.5rem] w-full text-center text-xl font-bold text-[#263238]">Alunos com mais faltas durante o ano</h1>

            {studentsMostFouls &&

              <Bar className="p-[0.5rem]"
                options= {{
                  indexAxis: "y",
                  responsive: true, 
                  maintainAspectRatio: true, 
                  plugins: { legend: {display: false}, 
                  tooltip: {callbacks: {title: (con) => {return studentsMostFouls[con[0].dataIndex].student.name}}}}, 
                  scales: { 
                    x: { beginAtZero: true, ticks: {precision: 0, color: "#263238", font: {weight: "bold"}}, grid: {display: true, color: "#99A1AF"}}, 
                    y: { ticks: {autoSkip: false, color: "#263238", font: {weight: "bold"}}, grid: {display: false}}
                  }
                }}
                data={{
                  labels: studentsMostFouls.map(mostFouls => mostFouls.student.name.split(" ")[0]),
                  datasets: [{
                    label: "Faltas",
                    data: studentsMostFouls.map(mostFouls => mostFouls.fouls),
                    backgroundColor: "#155DDD",
                    borderRadius: 6,
                    barThickness: 24,
                    borderWidth: 0,
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