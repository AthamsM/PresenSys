import { useNavigate } from "react-router-dom";

export default function Sidebar(props){
  const navigate = useNavigate();
  const iconsSize = "w-5";
  const options = [
    {
            name: "Painel",
            icon: "icons/dashboard.svg",
            active: false,
            route: "/dashboard"
        },
        {
            name: "Turmas",
            icon: "icons/class.svg",
            active: true,
            route: "/classes"
        },
        {
            name: "Relatórios",
            icon: "icons/report.svg",
            active: false,
            route: "/reports"
        },
        // {
        //     name: "Configurações",
        //     icon: "icons/setting.svg",
        //     active: false,
        //     route: "/configs"
        // }
  ]
  return(
    <aside className=" border-r border-gray-300 bg-white absolute h-screen sm:static z-2">

      <div className=" p-2 flex items-center border-b mb-2 border-gray-300 ">
        <img src="icons/user-full.svg" alt="" className="w-10 h-10 mr-2 object-cover"/>
        <div className="text-gray-800">
          <h3 className="text-[12px] font-bold">Presença Escolar</h3>
          <h4 className="text-[10px]">ETE Urbano Gomes</h4>
        </div>
      </div>

      <h2 className="text-xs ml-2 text-gray-600 mb-2">Menu</h2>
      <div className="">
        {
          options.map((e,index)=>(
            
            <button className="w-full pl-2 py-1 flex gap-3 items-center hover:bg-blue-100" onClick={() => navigate(e.route)} key={index}>
              <img src={e.icon} alt="" className="w-4 h-4"/>
              <p>{e.name}</p>
              
            </button>
          ))
        }
      </div>
      
    </aside>
  );
}