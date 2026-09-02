import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../../Controller/Api.jsx";
import Button from "../../Components/Button.jsx"

export default function Classes(props){

  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  useEffect(()=>{

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
  
  return(
    <div>
      { props.filter == null && (
        <>
          <h1 className="text-2xl font-bold">Turmas</h1>
          <p>Todas as turmas</p>
        </>
      )}
      
      <div className={`gap-5 mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto pb-24`}>
        {
          classes.map((e,index)=>{
            const classYear = e.grade.split("º");
            if(props.filter == "0" || props.filter == classYear[0] || props.filter == null){
            const alreadyTaken = attendanceStatus[e.id];

            return(
            <div key={index} className="border border-gray-200 shadow-sm shadow-gray-300 rounded-2xl overflow-hidden">
              <div className="bg-blue-100 p-5 rounded-t-2xl">
                <h2 className="text-xl font-bold">{e.grade} {e.name}</h2>
              <div className="mt-2 h-5 text-sm font-semibold text-green-600">
                {alreadyTaken && "Chamada realizada hoje"}
              </div>
            </div>
              <div className="p-5 rounded-2xl">
                <div className="flex justify-between mb-5">
                  <span className="text-sm flex">
                  <img src="icons/user.svg" alt="" className="w-5 mr-1"/>
                    {e._count.students} Alunos
                  </span>
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-400 text-white p-2 w-full rounded-2xl font-bold" onClick={()=>navigate(`/attendance?id=${e.id}`)}>Abrir chamada</Button>
              </div>
            </div>
            );
          }

          })}
      </div>
    </div>
  );
}