import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function Template( {children} ){

  const [ativarSide, setAtivarSide] = useState(true)
  const alterarSide = () => {
    setAtivarSide(!ativarSide);
  }

  return(
      <div className="">
        <div className="flex grid-cols-2 w-screen">
          {
            ativarSide &&
            <Sidebar/>
          }
          
          <div className="flex-1">
            <Navbar alterar={alterarSide}/>
            <div className="ml-5 mt-5">
              {children} 

              <div className="flex">
                
              </div>
            </div>
          </div>
        </div>     
      </div>
  );
}

export default Template;