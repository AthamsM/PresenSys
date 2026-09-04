import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Sidebar({ onNavigate }){

  const navigate = useNavigate();
  const options = [
    {
      name: "Painel",
      icon: "icons/chart.svg",
      active: false,
      route: "/dashboard"
    },
    {
      name: "Frequência",
      icon: "icons/class.svg",
      active: true,
      route: "/classes"
    },
    {
      name: "Relatórios",
      icon: "icons/report-menu.svg",
      active: false,
      route: "/reports"
    },
    {
      name: "Aluno",
      icon: "icons/user.svg",
      active: false,
      route: "/students"
    },
    // {
    //     name: "Configurações",
    //     icon: "icons/setting.svg",
    //     active: false,
    //     route: "/configs"
    // }
  ]

  const handleNavigate = (route) => {

    onNavigate?.();
    navigate(route);
    
  };

  return(
    <aside className="fixed sm:sticky top-0 h-screen w-50 shrink-0 border-r border-[#D1D5DC] bg-[#F9FBFC] z-100 animate-slide-in-left sm:animate-none">

      <div className="h-full flex flex-col justify-between divide-y-[0.138rem] divide-[#D1D5DC]">

        <div className="flex justify-center items-center mb-2">
          <img src="images/logo-h.svg" alt="logo" className="w-[10rem]"/>
        </div>

        <div className="flex-1">

          <h2 className="text-lg ml-2 text-gray-600 mb-2">Menu</h2>

          <nav>

            {options.map((e,index)=>(
                
              <button className="w-full pl-2 py-1 flex gap-3 items-center hover:bg-blue-100 cursor-pointer" onClick={() => handleNavigate(e.route)} key={index}>
                
                <img src={e.icon} alt="" className="w-8 h-8"/>
                <p className="text-lg">{e.name}</p>
                
              </button>

            ))}

          </nav>

        </div>

        <div className="p-[1rem]">

          <Button onClick={() => navigate("/logout")} className="w-full flex justify-center items-center gap-x-2 bg-[#F53939] hover:bg-[#CD1A19] active:bg-[#F53939] border-2 rounded-lg font-bold text-[1.1rem] text-[#EBEBEB] cursor-pointer transition">
                                    
            <img src="icons/logout-white.svg" alt="email-icon" className="w-[1.6rem]"/>
            Sair    
                                                  
          </Button>

        </div>

      </div>

    </aside>
  );
}