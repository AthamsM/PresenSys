import Template from "../Layout/Template";
import Classes from "./Classes/index";
import Attendance from "./Attendance";
import Login from "./Login";
import Relatorios from "./Relatorios";
import Page404 from "./404"

// Cores
//
// #263238
// #FFFFFC
// #EBEBEB
// #90CAF9
// #155DFC
//

// A depender da pagina, colocar tag entre template, tipo, <Template> <Home/> </Template>
const Pages = [
    {
        path : "/*",
        component : <Page404/>
    },
    {
        path : "/login",
        component : <Login/>
    },
    {
        path : "/classes",
        component : <Template><Classes/></Template>
    },
    {
        path: "/attendance",
        component: <Template><Attendance/></Template>
       
    },
    {
        path : "/reports",
        component : <Template><Relatorios/></Template>
    },
]

export default Pages