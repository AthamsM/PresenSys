import { useNavigate } from "react-router-dom";
import Button from "../Button";

export function AttendanceHeader({nameClass}) {
    
  const navigate = useNavigate();

    return (

        <div>

            <h1 className="text-[1.4rem] font-bold">
                {nameClass}
            </h1>

            <p className="text-[0.9rem] text-gray-500">
                {`${new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0].replace(/^\w/, c => c.toUpperCase())}, ${new Date().getDate()} de ${new Date().toLocaleDateString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())} de ${new Date().getFullYear()}`}
            </p>

        </div>

    );
}