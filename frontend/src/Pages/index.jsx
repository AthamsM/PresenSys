import Template from "../Layout/Template";
import Classes from "./Classes/index";
import Attendance from "./Attendance";
import Login from "./Login";
import Relatorios from "./Report";
import Page404 from "./404"
import Dashboard from "./Dashboard";

// Cores
//
// #263238
// #364153
// #FFFFFC
// #E5E7EB
// #EBEBEB
// #99A1Af
// #DBEAFE
// #82B6E0
// #90CAF9
// #1768F7
// #155DFC
// #155DDD
// #347D39
// #3A8C40
// #C10007
// #DB0008
//

// A depender da pagina, colocar tag entre template, tipo, <Template> <Home/> </Template>
const Pages = [
    {
        path : "/*",
        component : <Page404/>
    },
    {
        path : "/",
        component : <Login/>
    },
    {
        path : "/login",
        component : <Login/>
    },
    {
        path : "/classes",
        component : <Template><Classes height = "h-[500px]"/></Template>
    },
    {
        path: "/attendance",
        component: <Template><Attendance/></Template>
       
    },
    {
        path : "/reports",
        component : <Template><Relatorios/></Template>
    },
    {
      path : "/dashboard",
      component : <Template><Dashboard/></Template>
    }
]

export default Pages