import Classes from "../Classes";
import Card from "../../Components/Card";
import { useEffect, useState } from "react";
import API from "../../Controller/Api";

export default function Dashboard(){

  const [classes, setClasses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFouls, setTotalFouls] = useState(0);
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
  
  const cards = [{
    "title":"Turmas",
    "value":classes.length,
    "image":"../../../public/icons/class.svg",
  },
  {
    "title":"Alunos",
    "value":totalStudents,
    "image":"../../../public/icons/user.svg",
  },
  {
    "title":"Faltas do mês",
    "value":totalFouls,
    "image":"../../../public/icons/calendar.svg",
  },
  {
    "title":"Frequência média",
    "value":totalFouls==0 ? "100%" : (totalFouls/totalStudents*getPreviousBusinessDays())*100,
    "image":"../../../public/icons/trend-up.svg",
  }];
  const filters = [
      "Todos os anos",
      "1º Ano",
      "2º Ano",
      "3º Ano",
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
  
  const [selectedFilter, setSelectedFilter] = useState("0") //0 é igual a todos os anos
  const changeFilter = (e) =>{
    setSelectedFilter(e)
  }


  return(
    <div>
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-blue-900">Visão geral das turmas durante o mês</h1>
      </div>
      <div className="gap-3 flex overflow-x-auto h-[120px] w-[320px] sm:w-[400px] md:w-[600px] lg:w-[800px] xl:w-[1000px]">
        {
          cards.map((e, index)=>(
            <Card image={e.image} title={e.title} value={e.value} key={index}> 
            </Card>
          ))
        }
      </div>
      <div>
        <h1 className="text-2xl font-bold">Turmas</h1>
        <div className="flex gap-3">
          {
            filters.map((e, index)=>(
              <button key={index} className={`border p-1 px-2 rounded-2xl ${selectedFilter == index ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-white hover:bg-gray-300"}`} onClick={() => changeFilter(index)}>
                {e}
              </button>
            ))
          }
        </div>
      </div>
      <Classes height={"h-[400px]"} filter={selectedFilter}/>
    </div>
  );
}