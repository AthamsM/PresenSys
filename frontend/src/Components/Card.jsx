import { twMerge } from "tailwind-merge"

export default function Card(props){

  return(

    <div className={twMerge(props.className, "flex justify-center items-center px-6 py-4 gap-[0.8rem]")}>
      
      <img src={props.image} alt="" className="w-10 h-10"/>

      <div className="text-center">

        <p className="text-sm">{props.title}</p>
        <h1 className="text-lg font-semibold">{props.value}</h1>
        
      </div>
      
    </div>
  );
}