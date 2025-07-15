
import './App.css'
import Flow from "./components/Flow"
import MainForm from './components/MainForm'
// import HeaderPage from './components/HeaderPage'
// import QualityControlPlan from './components/QualityControlPlan'
import {BrowserRouter, Route, Routes } from "react-router-dom";
import {FlowChartEditor}from './components/atoms/OrganizationalChartFlow';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<MainForm/>}/>
      <Route path="/flow" element={<Flow/>}/>
       <Route path="/flowchart" element={<ReactFlowProvider><FlowChartEditor/></ReactFlowProvider>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
