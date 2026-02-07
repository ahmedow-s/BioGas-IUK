import { useState } from "react";
import { Link } from "react-router";

export default function Sidebar() {

    const [activeLink, setActiveLink] = useState("/");

    return (
        <div className="w-[257px] h-[411px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col p-4 rounded-b-lg">
            <nav className="flex flex-col gap-4">
                <Link to="/" className="text-[#1E7F43] font-medium text-[14px] hover:bg-[#F0F0F0] p-3 rounded-lg">Главный экран</Link>
                <Link to="/devices" className="text-[#1E7F43] font-medium text-[14px] hover:bg-[#F0F0F0] p-3 rounded-lg">Управление устройствами</Link>
                <Link to="/reports" className="text-[#1E7F43] font-medium text-[14px] hover:bg-[#F0F0F0] p-3 rounded-lg">Отчеты</Link>
                <Link to="/settings" className="text-[#1E7F43] font-medium text-[14px] hover:bg-[#F0F0F0] p-3 rounded-lg">Настройки</Link>
            </nav>
        </div>
    );
}