import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";

function Page404() {

    const navigate = useNavigate();

    return(

        <div className="h-screen w-screen flex flex-col justify-center items-center gap-y-[4rem] bg-[#FFFFFC]">


            <div className="flex flex-col items-center gap-y-[1rem]">

                <div className="flex items-center gap-x-[1rem]">

                    <img src="images/robot2.svg" alt="robot" className="w-[12rem]"></img>

                    <h1 className="font-blokan text-[12rem] text-[#90CAF9] leading-none">404</h1> 

                </div>
                
                <h3 className="font-blokan text-[2rem] text-[#90CAF9] leading-none uppercase">Página não encontrada ¯\_(ツ)_/¯</h3>
            
            </div>

            <div>
                <Button onClick={() => navigate("/classes")} className="bg-[#155DFC] hover:bg-[#90CAF9] active:bg-[#155DFC] rounded-md font-bold text-[1rem] text-[#EBEBEB] uppercase hover:text-[#263238] active:text-[#EBEBEB]">Voltar ao painel</Button>
            </div>

        </div>
    )
}

export default Page404;