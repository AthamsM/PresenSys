import Template from "../Layout/Template";
import Turmas from "../Pages/Turmas/index";
import Attendance from "../Pages/Attendance/index";
import Login from "./Login";
import Relatorios from "./Relatorios/index";

// A depender da pagina, colocar tag entre template, tipo, <Template> <Home/> </Template>
const Pages = [
    {
        path : "/",
        component : <Login/>
    },
    {
        path : "/turmas",
        component : <Template><Turmas/></Template>
    },
    {
        path: "/attendance",
        component: (
            <Template><Attendance/></Template>
        )
    },
    {
        path : "/relatorios",
        component : <Template><Relatorios/></Template>
    },
    {
        path : "/*",
        component : <Login/>
    }
]

export default Pages