import { useState } from "react";
import alunos from "../../../assets/alunos.png"
import { useNavigate } from "react-router-dom";

export default function Turmas(){

  const navigate = useNavigate();
  const [turmas, setTurmas] = useState([{nome:"teste"}, {nome:"BABABA"}]);
  // fazer a integração com o back ainda
  // puxar as turmas
  // e fazer a rota de chamadas

  return(
    <div className="ml-20 mt-10">
      <h1 className="text-2xl font-bold">Turmas</h1>
      <p>Todas as turmas</p>

      <div className="flex gap-5 mt-5 grid-cols-3">
        {
          turmas.map((e,index)=>(
            <div key={index} className="border rounded-2xl min-w-70 border-gray-400">
              <div className="bg-blue-100 p-5 rounded-t-2xl">
                <p className="text-sm">Manhã - Prof. {e.nome}</p>
                <h2 className="text-xl font-bold">1º Ano A</h2>
              </div>
              <div className="p-5 rounded-2xl">
                <div className="flex justify-between mb-5">
                  <span className="text-sm flex">
                  <img src={alunos} alt="" className="w-5 mr-1"/>
                    30
                  </span>
                  <span className="bg-amber-200 rounded-xl px-2 text-sm">90% presença</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-400 text-white p-2 w-full rounded-2xl font-bold" onClick={()=>navigate("/")}>Abrir chamada</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );


}