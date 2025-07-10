
import './App.css'
import Flow from "./components/Flow"
import MainForm from './components/MainForm'
// import HeaderPage from './components/HeaderPage'
// import QualityControlPlan from './components/QualityControlPlan'
import {BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectQualityControlManager from './components/pages/ProjectQualityControlManager';

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<MainForm/>}/>
      <Route path="/flow" element={<Flow/>}/>
       <Route path="/p" element={<ProjectQualityControlManager/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
