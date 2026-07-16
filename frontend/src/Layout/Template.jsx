import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function Template( {children} ){

  const [activateSide, setActivateSide] = useState(false)
  

  const changeSide = () => {
    setActivateSide(!activateSide);
    const width = window.innerWidth;
    if(width <= 640){
      setBackgroundGray(!backgroundGray);
    }
  }
  const [backgroundGray, setBackgroundGray] = useState(false);

  const removeSide = (id) => {
    const width = window.innerWidth;
    if(width <= 640){
      if(id !== "sidebar"){
        setActivateSide(false);
        setBackgroundGray(false);
      }
    }
    
  }
  return(
      <div className="h-screen bg-[#F9FBFC]">
        <div className="flex grid-cols-2">
          {
            activateSide &&
            <Sidebar/>
          }
          
          <div className={`flex-1 `} onClick={(e)=>removeSide(e.target.id)}>
            { backgroundGray &&
              <div className={` absolute h-screen w-screen opacity-50 bg-gray-700 z-1`} ></div>
            } 
            <Navbar alter={changeSide}/>
            <div className={`ml-5 mt-5 mr-10 h-[300px]`}>
              {children} 
            </div>
            
          </div>
        </div>     
      </div>
  );
}

export default Template;