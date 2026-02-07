import {useState}  from "react";
import Button from "../shared/ui/Button";


export function Header() {

    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const user = {
        name: "John Doe",
        role: "Администратор",
        profileImage: "/img/profile.jpg"
    };

    const handleProfileClick = () => {
        
    }


    return (
        <header className="bg-gradient-to-r from-[#A3E635] to-[#1A6B3A] w-full h-[87px] flex items-center justify-start mx-auto px-6">
            <div className="flex justify-between items-center w-full">
                <div className="grid grid-rows-1 grid-flow-col gap-3 items-center">
                    <img src="/icons/logo.svg" alt="" />
                    <h1 className="text-white text-[36px] font-semibold ml-4">DIGITAL BIOGAS</h1>
                </div>
                <div className="flex gap-4 items-center ">
                    <Button className="rounded-full bg-white w-[50px] h-[50px] flex items-center justify-center"><img src="/icons/notification.svg" alt="notification" className="" /></Button>
                    <div className="w-[212px] h-[55px] rounded-l-[25px] rounded-t-[10px] bg-white flex items-center  pl-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                        <div className="w-[45px] h-[45px] relative  rounded-full flex items-center justify-center">
                        <img className="w-full h-full object-cover rounded-full" src="/img/profile.jpg" alt="profile img" />
                        </div>
                        <div className="flex flex-col w-[109px] ml-3">
                            <h1 className="text-[16px] font-regular  mt-1">{user.name}</h1>
                            <p className="text-[12px] font-regular ">{user.role}</p>
                        </div>
                        <div className="w-[24px] h-[24px]">
                            <img src="/icons/arrow-down.svg" onClick={() => setActiveMenu(activeMenu === "profile" ? null : "profile")} alt="arrow down" className=""/>    
                            {activeMenu === "profile" && (
                                <div className="relative right-30 top-[15px] bg-white rounded-b-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)]  w-[150px]">
                                    <Button onClick={handleProfileClick} className="flex gap-2 w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <img src="/icons/user.svg" alt="" />
                                       Мой профиль</Button>
                                    <Button onClick={handleProfileClick} className="flex gap-2 w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <img src="/icons/settings.svg" alt="" />
                                        Настройки</Button>
                                    <Button onClick={handleProfileClick} className="flex gap-1 w-full text-left px-2 py-2 text-sm text-red-500 hover:bg-gray-100">
                                        <img src="/icons/exit.svg" alt="exit" className="w-6 h-6 mr-2" />
                                        Выйти</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
