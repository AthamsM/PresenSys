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
    <aside className=" border-r border-gray-300 bg-white absolute w-60 h-screen sm:static z-2">

      <div className="px-2 flex items-center border-b mb-2 border-gray-300 ">
        {/* <h1 className="font-more-sugar text-[#0A5DE4] text-[2rem] font-semibold">Presen</h1>
        <h1 className="font-more-sugar text-[#023580] text-[2rem] font-semibold">Sys</h1> */}
        <img src="images/logo.svg" alt="logo" className="w-[8rem]"/>
      </div>

      <h2 className="text-lg ml-2 text-gray-600 mb-2">Menu</h2>
      <div className="">
        {
          options.map((e,index)=>(
            
            <button className="w-full pl-2 py-1 flex gap-3 items-center hover:bg-blue-100" onClick={() => navigate(e.route)} key={index}>
              <img src={e.icon} alt="" className="w-8 h-8"/>
              <p className="text-lg">{e.name}</p>
              
            </button>
          ))
        }
      </div>
      
    </aside>
  );
}