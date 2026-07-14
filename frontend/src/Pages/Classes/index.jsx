import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../../Controller/Api.jsx";
import Button from "../../Components/Button.jsx"

export default function Classes(props){

  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  useEffect(()=>{

    API.get("/class").then((res)=>{
      //console.log(res.data);
      setClasses(res.data);
    }).catch((err)=>{
      
      console.log(err);
    });

  
  },[]);

  return(
    <div className="mt-5">
      { props.filter == null && (
        <>
          <h1 className="text-2xl font-bold">Turmas</h1>
          <p>Todas as turmas</p>
        </>
      )}
      
      <div className={`gap-5 mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${props.altura} overflow-y-auto`}>
        {
          classes.map((e,index)=>{
            const classYear = e.grade.split("º");
            if(props.filter == "0" || props.filter == classYear[0] || props.filter == null){
            return(
            <div key={index} className="border rounded-2xl border-gray-400 h-[200px]">
              <div className="bg-blue-100 p-5 rounded-t-2xl">
                <h2 className="text-xl font-bold">{e.grade} {e.name}</h2>
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
            )}
          })
        }
      </div>
    </div>
  );


}