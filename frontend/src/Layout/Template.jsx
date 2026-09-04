// import { useState } from "react";

// import Navbar from "../Components/Navbar";
// import Sidebar from "../Components/Sidebar";
// import { useEffect } from "react";

// function Template( {children} ){

//   const [activateSide, setActivateSide] = useState(true)
  

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if(width <= 640){
//         setActivateSide(false);
//       }else{
//         setActivateSide(true);
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     // Call the handler once to set the initial state
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const changeSide = () => {
//     setActivateSide(!activateSide);
//     const width = window.innerWidth;
//     if(width <= 640){
//       setBackgroundGray(!backgroundGray);
//     }
//   }
//   const [backgroundGray, setBackgroundGray] = useState(false);

//   const removeSide = (id) => {
//     const width = window.innerWidth;
//     if(width <= 640){
//       if(id !== "sidebar"){
//         setActivateSide(false);
//         setBackgroundGray(false);
//       }
//     }
    
//   }
//   return(
//       <div className="h-screen w-screen bg-[#F9FBFC] flex grid-cols-2">

//         {activateSide && <Sidebar/> }
        
//         <div className="flex-1 relative" onClick={(e)=>removeSide(e.target.id)}>
//           { backgroundGray &&
//             <div className="absolute inset-0 flex w-full opacity-50 bg-gray-700 z-1"></div>
//           } 
          
//           <Navbar alter={changeSide}/>

//           <div>
//             {children} 
//           </div>
          
//         </div> 

//       </div>
//   );
// }

// export default Template;

import { useEffect, useState } from "react";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function Template({ children }) {

  const [activateSide, setActivateSide] = useState(true);
  const [backgroundGray, setBackgroundGray] = useState(false);

  useEffect(() => {

    const handleResize = () => {

      const width = window.innerWidth;
      setActivateSide(width > 768);

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  const changeSide = () => {

    setActivateSide(prev => !prev);

    if (window.innerWidth <= 768) {
      setBackgroundGray(prev => !prev);
    }

  };

  const removeSide = (id) => {

    if (window.innerWidth <= 768 && id !== "sidebar") {

      setActivateSide(false);
      setBackgroundGray(false);

    }

  };

  const handleSidebarNavigate = () => {

    if (window.innerWidth <= 768) {
      setActivateSide(false);
      setBackgroundGray(false);
    }

  };


  return (

    <div className="h-screen w-full bg-[#F9FBFC] flex overflow-hidden">

      {activateSide && <Sidebar onNavigate={handleSidebarNavigate} className=""/>}

      <main className="flex-1 min-w-0 h-screen relative flex flex-col overflow-hidden" onClick={(e) => removeSide(e.target.id)}>

        {backgroundGray && (
          <div className="absolute inset-0 w-full h-full opacity-50 bg-gray-700 z-10"/>
        )}

        <Navbar alter={changeSide} />

        <div className="p-2 sm:p-5 flex-1 min-h-0 min-w-0 overflow-hidden">
          {children}
        </div>

      </main>

    </div>
  );
}

export default Template;