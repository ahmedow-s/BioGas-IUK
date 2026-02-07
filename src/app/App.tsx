import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { Header } from "../widgets/Header";
import { Sidebar } from "../widgets/Sidebar";
import Home from "../pages/Home";
import ProtectedLayout from "./Layouts/ProtecetedLayout";


export default function App() {
    return (
      <>

      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedLayout children={<Home />} />}>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={""} />
        </Route>
      </Routes>
      </>
    );
}