import { useState } from "react";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import API from "../../Controller/Api";
import {toast, Toaster } from "react-hot-toast";

function Login (){

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [viewPass, setViewPass] = useState(false);
    const [buttonType, setButtonType] = useState("password");

    function handleViewPass (view){

        setViewPass(!view)

        setButtonType(viewPass ? "txt": "password")
        
    }

    const submitLogin = async (data) => {

        try {

            setLoading(true);

            const login = {

                "email": data.email,
                "password": data.password,
                "school": data.school

            };

            const response = await API.post("/users/login", login);

            localStorage.setItem("token", response.data.token);
            
            navigate("/classes");
            
        } catch (error) {

            toast.error(<b>E-mail ou senha inválidos !!</b>, {id: "loginError", duration: 2500, style: { borderRadius: "0.375rem"} });

            console.error(error);
            
        } finally {

            setLoading(false)

        }
    }

    return(

        <main className="h-screen w-screen flex items-center justify-center">

            <div className="h-full w-full bg-[url(images/login-background.png)] bg-cover bg-center bg-no-repeat scale-110 blur-[0.25rem] fixed z-0"></div>

            <form onSubmit={handleSubmit(submitLogin)} className="p-[2rem] lg:p-[3rem] flex flex-col lg:flex-row justify-center items-center gap-x-[4rem] bg-[#DBEAFE]/90 backdrop-blur-sm border border-[#DBEAFE]/50 shadow-sm shadow-[#DBEAFE]/50 rounded-4xl z-10">

                <img src="images/logo.svg" alt="logo" className="w-[16rem] lg:w-[24rem]"/>

                <div className="flex flex-col gap-y-[1.8rem] lg:gap-y-[4rem] px-[0.19rem] text-[#364153] text-[0.9rem]">

                    <div className="text-center">
                        <h1 className="hidden lg:block font-bold text-[2rem] lg:text-[3rem]">Bem-vindo(a)!</h1>
                        <h1 className="mt-[0.5rem] font-bold text-[1rem] text-[#99A1Af]">Faça login para acessar o sistema</h1>
                    </div>

                    <div className="flex flex-col gap-y-[1.8rem] lg:gap-y-[2.5rem] text-[1rem]">

                        <div>

                            <h1 className="font-semibold mb-[1.5rem] text-left">E-mail</h1>
                            
                            <Input {...register("email")} type="email" required placeholder="seu@email.com" className="w-full h-[2.5rem] px-[2.7rem] bg-[#FFFFFC] rounded-xl border-[#263238]/50 outline-[#263238] ring-[#263238]/80"
                                leftIcon={

                                    <img src="icons/email.svg" alt="email-icon" className="w-[1.8rem]"/>

                                }
                            />


                        </div>

                        <div>

                            <h1 className="font-semibold mb-[1.5rem] ">Senha</h1>

                            <Input {...register("password")} type={buttonType} required placeholder="digite sua senha" className="w-full h-[2.5rem] px-[2.7rem] bg-[#FFFFFC] rounded-xl border-[#263238]/50 outline-[#263238] ring-[#263238]/80" 
                                
                                leftIcon={
                                    <img src="icons/key.svg" alt="email-icon" className="w-[1.8rem]"/>
                                }

                                rightIcon={
                                    <Button type="button" onClick={() => (handleViewPass(viewPass))} className="w-full text-[#EBEBEB] cursor-pointer transition delay-50 duration-50 ease-in-out">
                                        {viewPass ?
                                            <img src="icons/eye-slash.svg" alt="email-icon" className="w-[1.5rem]"/>
                                            : 
                                            <img src="icons/eye.svg" alt="email-icon" className="w-[1.5rem]"/>
                                        }
                                    </Button>
                                }
                            />
                            

                        </div>

                        <div>
                            <h1 className="font-semibold mb-1 ">Escola</h1>

                            <div className="relative">

                                <img src="icons/school-solid.svg" alt="School" className="absolute left-1 top-1/2 -translate-y-1/2 w-6 pointer-events-none"/>

                                <select {...register("school")} defaultValue="public" required className="w-full h-[2.5rem] px-[2.7rem] bg-[#FFFFFC] rounded-xl border border-2 border-[#263238]/50 outline-[#263238] focus:ring-2 ring-[#263238]/80">
                                    <option value="public">ETE Urbano</option>
                                    <option value="EREM_AURA_SAMPAIO">EREM Aura</option>
                                </select>

                            </div>
                        </div>

                    </div>

                    <Button type="submit" disabled={loading} className="w-full mt-[0.5rem] lg:mt-0 bg-[#347D39] hover:bg-[#3A8C40] active:bg-[#347D39] border-2 border-[#364153]/20 rounded-2xl font-bold text-[1rem] text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#347D39] transition delay-50 duration-50 ease-in-out uppercase">
                                
                        <div className="flex justify-center items-center gap-x-[1rem]">
                            <img src="icons/right-to.svg" alt="email-icon" className="w-[1.6rem]"/>
                            Entrar
                        </div>        
                                               
                    
                    </Button>
               
                </div>

            </form>

            <div><Toaster/></div>

        </main>

    )

}

export default Login;