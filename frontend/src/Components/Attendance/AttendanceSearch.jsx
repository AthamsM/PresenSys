import Input from "../Input";

export function AttendanceSearch({ value, onChange }) {

    return (

        <div className="rounded-lg w-full flex-2">

            <Input type="text" value={value} placeholder="Buscar aluno..." onChange={(e) => onChange(e.target.value)} className="h-[1.9rem] pl-[2rem] pr-[0.8rem] bg-[#FFFFFC] rounded-lg border border-gray-200 focus:border-[#155DDD] outline-[#155DDD] ring-[#155DDD]/80 shadow-sm shadow-gray-300" 
                                
                leftIcon={
                    <img src="icons/loupe-gray.svg" alt="email-icon" className="w-[1.4rem]"/>
                }

            />
        </div>

    );

}