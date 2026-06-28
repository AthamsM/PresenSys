import Pages from "./Pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            Pages.map((pages, index) => (<Route key = {index} path = {pages.path} element = {pages.component}/>))
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
