import { useNavigate } from "react-router-dom";

export default function Sidebar(){
  const navigate = useNavigate();
  const tamanhoIcons = "w-5";
  const opcoes = [
    {
            nome: "Painel",
            icon: "icons/dashboard.svg",
            ativo: false,
            rota: "/dashboards"
        },
        {
            nome: "Turmas",
            icon: "icons/class.svg",
            ativo: true,
            rota: "/classes"
        },
        {
            nome: "Relatórios",
            icon: "icons/report.svg",
            ativo: false,
            rota: "/reports"
        },
        {
            nome: "Configurações",
            icon: "icons/setting.svg",
            ativo: false,
            rota: "/configs"
        }
  ]
  // fazer a integração com o back ainda
  // para mudar o icone e descrição
  return(
    <aside className=" border-r border-gray-400 h-screen ">
      <div className=" p-2 flex items-center border-b mb-2 border-gray-400">
        <img src="icons/user-full.svg" alt="" className="w-10 mr-2 object-cover"/>
        <div className="text-gray-800">
          <h3 className="text-[12px] font-bold">Presença Escolar</h3>
          <h4 className="text-[10px]">EMEF Jardim Estrela</h4>
        </div>
      </div>

      <h2 className="text-xs ml-2 text-gray-600 mb-2">Menu</h2>
      <div className="">
        {
          opcoes.map((e,index)=>(
            
            <button className="w-full pl-2 py-1 flex gap-3 items-center hover:bg-blue-100" onClick={() => navigate(e.rota)}
             key={index}>
              <img src={e.icon} alt="" className="w-4 h-4"/>
              <p>{e.nome}</p>
              
            </button>
          ))
        }
      </div>
      
    </aside>
  );
}