import Button from "../Button";

export function AttendanceActions({ onMarkAll }) {

    return (

        <div className="flex items-center">

            <Button onClick={onMarkAll} className="px-[0.5rem] py-[0.2rem] bg-[#347D39] hover:bg-[#499E4E] active:bg-[#347D39] rounded-lg font-bold text-[1rem] text-[#EBEBEB] cursor-pointer transition delay-50 duration-50 ease-in-out shadow-sm shadow-gray-300">
                                
                <div className="flex justify-center items-center gap-x-[0.4rem] text-[0.9rem]">
                    <img src="icons/list-check-w.svg" alt="email-icon" className="w-[1.5rem]"/>
                    Marcar todos
                </div>        
                                               
            </Button>

        </div>
    );  
}