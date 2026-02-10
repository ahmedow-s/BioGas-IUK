import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedLayout from "./Layouts/ProtecetedLayout";
import Devices from "../pages/Devices";
import Monitoring from "../pages/Monitoring";
import EnvironmentalEffect from "../pages/EnvironmentalEffect";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import AddDevice from "../pages/AddDevices";

export default function App() {
    return (
      <>

    <Routes>
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedLayout /> }>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='devices' element={<Devices />} />
        <Route path="add-device" element={<AddDevice />} />
        <Route path='monitoring' element={<Monitoring />} />
        <Route path='environmental-effect' element={<EnvironmentalEffect />} />
        <Route path='notifications' element={<Notifications />} />
        <Route path='settings' element={<Settings />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
      </>
    );
}
