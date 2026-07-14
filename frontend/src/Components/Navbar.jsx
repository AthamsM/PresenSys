export default function Navbar(props){

  return (
    <div className="flex justify-start border-b p-1 border-gray-300 font-bold">
      
      <button className="hover:bg-gray-200 rounded-lg p-1 mr-2" onClick={props.alter}>
        <img id="sidebar" src="icons/sidebar.svg" alt="Desativar a barra lateral" className="w-5"/>
      </button>
      <h1>Presença Escolar</h1>

    </div>
  );
}