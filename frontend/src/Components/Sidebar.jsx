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
    <aside className="fixed py-1 sm:py-3 lg:sticky top-0 h-screen w-50 shrink-0 border-r border-[#D1D5DC] bg-[#F9FBFC] z-100 animate-slide-in-left lg:animate-none">

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

        <div className="pt-1 sm:pt-3 px-2 flex justify-center items-center">

          <Button onClick={() => navigate("/logout")} className="px-[0.4rem] py-[0.2rem] w-full flex justify-center items-center gap-x-2  bg-[#FF746C]/20 hover:bg-[#FF746C]/60 text-[#FF746C]/60 hover:text-[#EBEBEB] rounded-lg text-[1rem] font-bold cursor-pointer transition">
                                    
            <svg viewBox="0 0 640 640" className="size-[1.7rem] fill-current">
              <path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z"/>
            </svg>
            Sair    
                                                  
          </Button>

        </div>

      </div>

    </aside>
  );
}