import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useEffect } from "react";

function Template( {children} ){

  const [activateSide, setActivateSide] = useState(true)
  

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if(width <= 640){
        setActivateSide(false);
      }else{
        setActivateSide(true);
      }
    };

    window.addEventListener('resize', handleResize);

    // Call the handler once to set the initial state
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <div className="min-h-screen bg-[#F9FBFC] flex grid-cols-2">

        {activateSide && <Sidebar/> }
        
        <div className="flex-1 relative" onClick={(e)=>removeSide(e.target.id)}>
          { backgroundGray &&
            <div className="absolute inset-0 flex w-full opacity-50 bg-gray-700 z-1"></div>
          } 
          <Navbar alter={changeSide}/>
          <div className="m-5">
            {children} 
          </div>
          
        </div> 

      </div>
  );
}

export default Template;