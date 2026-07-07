import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../../Controller/Api.jsx";

export default function Turmas(){

  const navigate = useNavigate();
  const [turmas, setTurmas] = useState([]);

  useEffect(()=>{

    API.get("/turmas").then((res)=>{
      console.log(res.data);
      setTurmas(res.data);
    }).catch((err)=>{
      
      console.log(err);
    });
    //tem que terminar as informações para preencher o card abaixo
  
  },[]);

  return(
    <div className="ml-10 mt-5">
      <h1 className="text-2xl font-bold">Turmas</h1>
      <p>Todas as turmas</p>

      <div className="gap-5 mt-5 grid grid-cols-3 mr-10">
        {
          turmas.map((e,index)=>(
            <div key={index} className="border rounded-2xl min-w-60 border-gray-400">
              <div className="bg-blue-100 p-5 rounded-t-2xl">
                <p className="text-sm">Manhã - Prof. {e.nome}</p>
                <h2 className="text-xl font-bold">{e.serie} {e.nome}</h2>
              </div>
              <div className="p-5 rounded-2xl">
                <div className="flex justify-between mb-5">
                  <span className="text-sm flex">
                  <img src="icons/user.svg" alt="" className="w-5 mr-1"/>
                    {e._count.alunos}
                  </span>
                  <span className="bg-amber-200 rounded-xl px-2 text-sm">90% presença</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-400 text-white p-2 w-full rounded-2xl font-bold" onClick={()=>navigate(`/attendance?id=${e.id}`)}>Abrir chamada</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );


}