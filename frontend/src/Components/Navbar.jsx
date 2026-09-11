export default function Navbar(props){

  return (

    <div className="flex lg:hidden justify-between items-center border-b px-2 border-gray-300 font-bold">
      
      <div>
        <button onClick={props.alter} className="hover:bg-gray-200 rounded-lg p-1 drop-shadow-md drop-shadow-[#263238]/20">
          <img id="sidebar" src="icons/bars-solid.svg" alt="Desativar a barra lateral" className="w-[1.90rem]"/>
        </button>
      </div>

      <div className="pt-1 drop-shadow-md drop-shadow-[#263238]/20">
        <img src="images/logo-name.svg" alt="presensys" className="w-[12rem] "/>
      </div>

      <div className="drop-shadow-md drop-shadow-[#263238]/20">
        <img id="sidebar" src="images/favicon.svg" alt="favicon" className="w-[3rem]"/>
      </div>

    </div>
  );
}