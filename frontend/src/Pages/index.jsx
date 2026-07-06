import Template from "../Layout/Template";
import Turmas from "./Turmas";
import Attendance from "./Attendance";
import Login from "./Login";
import Page404 from "./404"

// Fontes
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
        component : <Template><Turmas/></Template>
    },
    {
        path: "/attendance",
        component: <Template><Attendance/></Template>
        
    },
]

export default Pages