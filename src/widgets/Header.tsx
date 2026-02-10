import { useState } from "react";
import Button from "../shared/ui/Button";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux'
import { clearToken } from '../shared/lib/redux/slices/authSlice'
import type { AppDispatch, RootState } from '../shared/lib/redux/store'
import { useNavigate } from 'react-router-dom'

export function Header({ onBurgerClick, onCloseMobile }: { onBurgerClick?: () => void; onCloseMobile?: () => void }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const authUser = useSelector((state: RootState) => state.auth.user)
  console.log('Header authUser:', authUser)
  
  const profileImage =  '/img/profile1.jpg'
  const user = { name: authUser?.name || 'Асанов Асан', role: authUser?.role || 'Администратор', profileImage }

  const handleProfileClick = () => {
    console.log("Профиль или выход");
  };

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearToken())
    navigate('/login')
  }

  return (
    <header className="bg-gradient-to-br from-[#A3E635] to-[#1A6B3A] w-full h-[87px] flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBurgerClick}
          className="lg:hidden p-2 rounded-md hover:bg-white/20 transition"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        <img src="/icons/logo.svg" alt="logo" />
        <h1 className="text-white text-[24px] sm:text-[36px] font-semibold ml-2 sm:ml-4">
          DIGITAL BIOGAS
        </h1>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <Button className="rounded-full bg-white w-[50px] h-[50px] flex items-center justify-center">
          <img src="/icons/notification.svg" alt="notification" />
        </Button>

        <div className="relative">
          <div className="w-[212px] h-[55px] rounded-l-[25px] rounded-t-[10px] bg-white flex items-center pl-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer">
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={user.profileImage}
                alt="profile"
              />
            </div>
            <div className="flex flex-col w-[109px] ml-3">
              <h1 className="text-[16px] font-regular mt-1">{user.name}</h1>
              <p className="text-[12px] font-regular">{user.role}</p>
            </div>
            <img
              src="/icons/arrow-down.svg"
              onClick={() =>
                setActiveMenu(activeMenu === "profile" ? null : "profile")
              }
              alt="arrow down"
              className="w-[24px] h-[24px] ml-auto mr-2 cursor-pointer"
            />
          </div>

          {activeMenu === "profile" && (
            <div className="absolute right-0 top-full mt-0 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-[150px] z-20 overflow-hidden" >
              <Button
                onClick={() => {navigate('/profile')}}
                className="flex gap-2 w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <img src="/icons/user.svg" alt="" /> Мой профиль
              </Button>
              <Button
                onClick={handleProfileClick}
                className="flex gap-2 w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <img src="/icons/settings.svg" alt="" /> Настройки
              </Button>
              <Button
                onClick={handleLogout}
                className="flex gap-1 w-full text-left px-2 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                <img src="/icons/exit.svg" alt="exit" className="w-6 h-6 mr-2" /> Выйти
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
