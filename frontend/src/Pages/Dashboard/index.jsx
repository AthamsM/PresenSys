import Card from "../../Components/Card";
import { useEffect, useState } from "react";
import API from "../../Controller/Api";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
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
  const [presFouls, setPresFouls] = useState([]);
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

    API.get(`/charts/classes-fouls/${year}`).then(response => {
      
      setClassesMostFouls(response.data);

    }).catch(error=>{

      console.log(error);

    });

  },[]);

  useEffect(() => {

    API.get(`/charts/presences-fouls/${year}`).then(response => {
      
      setPresFouls(response.data[0]);

    }).catch(error=>{

      console.log(error);

    });

  },[]);

   return(

    <div className="h-full overflow-hidden flex flex-col overflow-hidden">

        <div className="shrink-0 divide-y-[0.138rem] divide-[#99A1AF]/10">

          <h1 className="mb-4 text-[1.2rem] sm:text-[1.3rem] font-bold text-center sm:text-left">Visão geral durante o mês</h1>
          
          <div className="mb-[0.5rem] pr-[1.1rem] pl-[0.5rem] pb-[0.5rem] flex justify-between gap-x-[1rem] text-[#263238]/90 w-full overflow-y-hidden overflow-x-auto xl:overflow-hidden scrollbar-thumb-[#155DDD]/80 scrollbar-track-[#99A1AF]/10 scrollbar-thin snap-x">
            {
              cards.map((e, index)=>(<Card image={e.image} title={e.title} value={e.value} key={index} className="xl:w-[16rem] xl:gap-x-[2rem] bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300 rounded-lg flex-none md:flex scale-85 sm:scale-100 animate-scale-in-center [--animation-duration:0.33s] snap-center"/>))
            }
          </div>

        </div>

        <div className="flex flex-col flex-1 min-h-0 divide-y-[0.138rem] divide-[#99A1AF]/10"> 

          <h1 className="mb-4 text-[1.2rem] sm:text-[1.3rem] font-bold text-center sm:text-left">Visão geral durante o ano</h1>
          
          <div className="flex-1 min-h-0 overflow-y-auto px-[0.5rem] pb-[0.5rem] grid grid-cols-1 2xl:grid-cols-2 gap-[1.5rem] scrollbar-thumb-[#155DDD]/80 scrollbar-track-[#99A1AF]/10 scrollbar-thin">

            <div className="w-full bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/30"> 

              <h1 className="p-[0.5rem] text-center text-[0.9rem] sm:text-[1rem] font-bold text-[#263238]/90">Faltas durante os meses do ano</h1>

              <div className="h-[19rem] 2xl:h-[25rem] p-[1rem]">
                {foulsPerMonth &&

                  <Line 
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
                        label: " Faltas",
                        data: foulsPerMonth.map(fouls => fouls.fouls),
                        backgroundColor: "#1768F790",
                        borderColor: "#1768F7",
                        borderWidth: 4,
                        pointRadius: 3,
                        pointHoverRadius: 8,
                        pointBackgroundColor: "#023580",
                        pointBorderColor: "#023580"

                      },]
                    }}
                  />
                }
              </div>

            </div>

            <div className="w-full bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/30"> 

              <h1 className="p-[0.5rem] text-center text-[0.9rem] sm:text-[1rem] font-bold text-[#263238]/90">Alunos com mais faltas durante o ano</h1>

              <div className="h-[19rem] 2xl:h-[25rem] p-[1rem]">
                {studentsMostFouls &&

                  <Bar 
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

            </div>

            <div className="w-full bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/30"> 

              <h1 className="p-[0.5rem] text-center text-[0.9rem] sm:text-[1rem] font-bold text-[#263238]/90">Turmas com mais faltas durante o ano</h1>

              <div className="h-[38rem] sm:h-[19rem] 2xl:h-[25rem] p-[1rem]">
                {classesMostFouls &&

                  <Pie 
                    options= {{
                      responsive: true, 
                      maintainAspectRatio: false, 
                      layout: {
                        padding: {bottom: 10},
                      },
                      plugins: {
                        legend: {
                          position: "bottom", align: "center",
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
                            },

                          }
                        },
                      }
                    }}
                    data={{
                      labels: classesMostFouls.map(mostFouls => (`${mostFouls.class.grade.split(" ")[0]} ${mostFouls.class.name} (${mostFouls.fouls} ${window.innerWidth <= 1333 ? "F" : "faltas"})`)),
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

            <div className="w-full bg-[#FFFFFC] border border-gray-200 shadow-sm shadow-gray-300 rounded-lg divide-y-[0.138rem] divide-[#99A1AF]/30"> 

              <h1 className="p-[0.5rem] text-center text-[0.9rem] sm:text-[1rem] font-bold text-[#263238]/90">Taxa de presenças e faltas</h1>

              <div className="h-[19rem] 2xl:h-[25rem] p-[1rem]">
                {presFouls &&

                  <Doughnut 
                    options= {{
                      responsive: true, 
                      maintainAspectRatio: false, 
                      layout: {
                        padding: {bottom: 10},
                      },
                      plugins: {
                        legend: {
                          position: "bottom", align: "center",
                          labels: {font: {size:14, weight: "bold"}, color: "#263238", padding: 15,},
                        }, 
                        tooltip: {
                          titleFont: {size: 15, weight: "bold"}, 
                          bodyFont: {size: 14, weight: "bold"}, 
                          callbacks: {label: (con) => {return ` ${con.raw} %`;}
                          }
                        },
                      }
                    }}
                    data={{
                      labels: [`Presença - (${((presFouls.presences / (presFouls.presences + presFouls.fouls)) * 100).toFixed(1)} %)`, `Falta - (${((presFouls.fouls  / (presFouls.presences + presFouls.fouls)) * 100).toFixed(1)} %)`],
                      datasets: [{
                        data: [((presFouls.presences / (presFouls.presences + presFouls.fouls)) * 100).toFixed(1), ((presFouls.fouls  / (presFouls.presences + presFouls.fouls)) * 100).toFixed(1)],
                        backgroundColor: [generateColor(presFouls.presences, 0.5), generateColor(presFouls.fouls, 0.5)],
                        borderColor: [generateColor(presFouls.presences, 0.8), generateColor(presFouls.fouls, 0.8)],
                        borderWidth: 2,
                      },]
                    }}
                  />
                }
              </div>

            </div>

          </div>

        </div>

    </div>

  );
}