import turmas from "../../assets/alunos.png";
import relatorio from "../../assets/analise-de-dados.png";
import config from "../../assets/big-gear.png";
import dashboard from "../../assets/painel-de-controle.png";
import user from "../../assets/user.png";
import { useNavigate } from "react-router-dom";



export default function Sidebar(){
  const navigate = useNavigate();
  const tamanhoIcons = "w-5";
  const opcoes = [
    {
            nome: "Dashboard",
            icon: dashboard,
            ativo: false,
            rota: "/dashboard"
        },
        {
            nome: "Turmas",
            icon: turmas,
            ativo: true,
            rota: "/turmas"
        },
        {
            nome: "Relatórios",
            icon: relatorio,
            ativo: false,
            rota: "/relatorios"
        },
        {
            nome: "Configurações",
            icon: config,
            ativo: false,
            rota: "/configuracoes"
        }
  ]
  // fazer a integração com o back ainda
  // para mudar o icone e descrição
  return(
    <aside className=" border-r border-gray-400 h-screen ">
      <div className=" p-2 flex border-b mb-2 border-gray-400">
        <img src={user} alt="" className="w-10 mr-2 object-cover"/>
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