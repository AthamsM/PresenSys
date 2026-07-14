import { useNavigate } from "react-router-dom";

export function AttendanceHeader() {
  const navigate = useNavigate();
    return (
        <div>
            <button className="flex items-center gap-2 text-gray-500"
              onClick={()=> navigate("/classes")}>
                <img
                    src="icons/back-arrow.svg"
                    alt="Voltar"
                    className="w-4 h-4"
                />
                Voltar
            </button>

            <h1 className="mt-4 text-4xl font-bold">
                1º Ano A
            </h1>

            <p className="text-gray-500">
                {`${new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).split('-')[0].replace(/^\w/, c => c.toUpperCase())},${new Date().getDate()} de ${new Date().toLocaleDateString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())} de ${new Date().getFullYear()}`}
            </p>
        </div>
    );
}