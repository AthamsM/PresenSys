import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function Template( {children} ){

  const [ativarSide, setAtivarSide] = useState(false)
  

  const alterarSide = () => {
    setAtivarSide(!ativarSide);
    const width = window.innerWidth;
    if(width <= 640){
      setBackgroundGray(!backgroundGray);
    }
  }
  const [backgroundGray, setBackgroundGray] = useState(false);

  const tirarSidebar = (id) => {
    const width = window.innerWidth;
    if(width <= 640){
      if(id !== "sidebar"){
        setAtivarSide(false);
        setBackgroundGray(false);
      }
    }
    
  }
  return(
      <div className=" bg-[#f9fbfc]">
        <div className="flex grid-cols-2 w-screen">
          {
            ativarSide &&
            <Sidebar/>
          }
          
          <div className={`flex-1 h-screen `} onClick={(e)=>tirarSidebar(e.target.id)}>
            { backgroundGray &&
              <div className={` absolute h-screen w-screen opacity-50 bg-gray-700 z-1`} ></div>
            } 
            <Navbar alterar={alterarSide}/>
            <div className={`ml-5 mt-5 h-[300px]`}>
              {children} 
            </div>
            
          </div>
        </div>     
      </div>
  );
}

export default Template;