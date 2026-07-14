export default function Card(props){

  return(
    <div className="flex border rounded-2xl min-w-[200px] h-[100px] py-5 px-4 border-gray-400">
      <img src={props.image} alt="" className="w-10 h-10 mr-5 "/>
      <div className="text-center">
        <p className="text-sm">{props.title}</p>
        <h1 className="text-xl font-semibold">{props.value}</h1>
      </div>
      
    </div>
  );
}