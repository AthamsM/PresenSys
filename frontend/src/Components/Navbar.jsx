export default function Navbar(props){

  return (
    <div className="flex justify-start items-center border-b p-1 border-gray-300 font-bold">
      
      <button className="hover:bg-gray-200 rounded-lg p-1 mr-2" onClick={props.alter}>
        <img id="sidebar" src="icons/bars-solid.svg" alt="Desativar a barra lateral" className="w-8"/>
      </button>
      <h1 className="text-2xl" >Presença Escolar</h1>

    </div>
  );
}