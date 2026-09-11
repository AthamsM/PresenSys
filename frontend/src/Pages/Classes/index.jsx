import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../../Controller/Api.jsx";
import Button from "../../Components/Button.jsx"

export default function Classes(props){

  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("0")
  const [filters, setFilters] = useState([]);

  const changeFilter = (e) =>{ 

    setSelectedFilter(e)  
  
  }
  
  async function findClass() {

    try {

      const { data } = await API.get("/class");
      const grade = [...new Set(data.map(item => item.grade))];
      grade.unshift('Todos');

      setFilters(grade);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    async function loadClasses() {
      try {

        const res = await API.get("/class");
        setClasses(res.data);
        const today = new Date();
        const date =
          `${today.getFullYear()}-` +
          `${String(today.getMonth() + 1).padStart(2, "0")}-` +
          `${String(today.getDate()).padStart(2, "0")}`;
        const status = {};
        await Promise.all(
          res.data.map(async (turma) => {
            try {
              const checkResponse = await API.get(`/attendances/check/${turma.id}/${date}`);
              status[turma.id] = checkResponse.data.alreadyTaken;
            } catch (error) {
              console.error(`Erro ao verificar chamada da turma ${turma.id}:`, error);
              status[turma.id] = false;
            }
          })
        );

        setAttendanceStatus(status);

      } catch (err) {
        console.log(err);
      }
    }

    loadClasses();

  }, []);

  useEffect(() => {

    findClass();

  }, []);
  
  return(

    <div >

      <div className="mb-3">

        <h1 className="text-[1.2rem] sm:text-[1.3rem] font-bold mb-2">Turmas</h1>

        <div className="flex gap-3">
          {filters.map((e, index)=>(
            <Button key={index} className={`p-1 px-2 text-[0.8rem] font-bold text-[#263238]/90 border border-gray-300 shadow-md shadow-gray-300 rounded-lg ${selectedFilter == index ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-white hover:bg-gray-300"}`} onClick={() => changeFilter(index)}> {e} </Button>
          ))}
        </div>

      </div>

      <div className="h-[calc(100vh-155px)] sm:h-[calc(100vh-170px)] lg:h-[calc(100vh-120px)] py-[0.2rem] overflow-y-auto scrollbar-thumb-[#155DDD]/80 scrollbar-track-[#99A1AF]/10 scrollbar-thin snap-x">
      
        <div className="gap-5 px-[0.5rem] pb-[0.5rem] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          
          {classes.map((e,index) => {

            const classYear = e.grade[0];

            if(selectedFilter == "0" || selectedFilter == classYear || selectedFilter == null){

              const alreadyTaken = attendanceStatus[e.id];

              return(

                <div key={`${index}-${selectedFilter}`} className="border border-gray-200 shadow-md shadow-gray-300 rounded-lg overflow-hidden animate-scale-in-center [--animation-duration:0.33s]">
                  <div className="bg-blue-100 p-3">
                    <h2 className="text-[1rem] font-bold">{e.grade} {e.name}</h2>
                    <div className="mt-2 h-2 text-sm font-semibold text-green-600">
                      {alreadyTaken && "Chamada realizada hoje"}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg">
                    <div className="flex justify-between mb-5">
                      <span className="text-[0.85rem] flex">
                      <img src="icons/user.svg" alt="" className="w-5 mr-1"/>
                        {e._count.students} Alunos
                      </span>
                    </div>
                    
                    <Button className="text-[0.8rem] bg-blue-600 hover:bg-blue-400 text-white p-2 w-full font-bold rounded-lg" onClick={()=>navigate(`/attendance?id=${e.id}`)}>Abrir chamada</Button>
                  </div>
                </div>

              );
            }

            })}
        </div>

      </div>
    </div>
  );
}