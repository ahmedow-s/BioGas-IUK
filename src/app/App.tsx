import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { Header } from "../widgets/Header";
import Sidebar from "../widgets/Sidebar";


export default function App() {
    return (
      <>
        <Header />
        <Sidebar />
      <Routes>
        <Route path='/' element={""} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </>
    );
}