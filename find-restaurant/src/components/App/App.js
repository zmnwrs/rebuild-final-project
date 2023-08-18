import "@reach/combobox/styles.css";
import "./App.css"
import { Route, Routes } from "react-router-dom"

//import all these following for google find place

import HomePage from "../Pages/HomePage";
import EmptyPage from "../Pages/NotFoundPage";
import { Map } from "../Map/map";
import ContactPage from "../Pages/Contact";
import Navbar from "../Pages/Navrbar";


export default function App() {
  return (
    <>
   <Navbar />
   <div className="container">
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/map" element={<Map />} /> 
      <Route path="/contact" element={<ContactPage />} /> 
      <Route path="/*" element={<EmptyPage />} /> 
    </Routes>
    </div>
    </>
  )
}


