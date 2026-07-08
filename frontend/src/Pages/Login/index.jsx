import { useState } from "react";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import API from "../../Controller/Api"
import {toast, Toaster } from "react-hot-toast"

function Login (){

    const { register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const submitLogin = async (data) => {

        try {

            setLoading(true)

            const login = {

                "email": data.email,
                "password": data.password,

            }

            const response = await API.post("/users/login", login)

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

            <div className="h-screen w-screen bg-[url(images/login-background.svg)] bg-cover bg-center bg-no-repeat fixed z-0"></div>

            <form onSubmit={handleSubmit(submitLogin)} className="p-[3rem] flex flex-col justify-center gap-y-[3rem] bg-[#FFFFFC] rounded-md shadow-[#263238]/80 shadow-2xl z-10">

                <h1 className="font-blokan text-[4.5rem] text-[#155DDD] leading-none">PresenSys</h1>

                <div className="flex flex-col gap-y-[1rem] px-[0.19rem] text-[#263238] text-[0.9rem]">

                    <div>
                        <h1 className="font-semibold">E-mail</h1>
                        <Input {...register("email")} type="email" required placeholder="Ex.: Einstein15@gmail.com" className="w-full border-[#263238] outline-[#263238] ring-[#263238]"/>
                    </div>

                    <div>
                        <h1 className="font-semibold">Senha</h1>
                        <Input {...register("password")} type="password" required placeholder="Ex.: N1e6wt8o7n" className="w-full border-[#263238] outline-[#263238] ring-[#263238]"/>
                    </div>

                </div>

                <Button type="submit" disabled={loading} className="w-full bg-[#347D39] hover:bg-[#3A8C40] active:bg-[#347D39] rounded-md font-bold text-[1rem] text-[#EBEBEB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#347D39] transition delay-50 duration-50 ease-in-out uppercase">Entrar</Button>

            </form>

            <div><Toaster/></div>

        </main>

    )

}

export default Login;