import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Bell, ChartNoAxesCombined, LayoutDashboard, LogOut, Settings, Sprout, TowerControl } from 'lucide-react'
import Button from '../shared/ui/Button'
import { clearToken } from '../shared/lib/redux/slices/authSlice'
import { useDispatch } from 'react-redux'

interface SidebarProps {
    mobileOpen?: boolean
    onClose?: () => void
    onToggle?: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // simulate fetching role
        const t = setTimeout(() => {
            setRole('admin')
            setLoading(false)
        }, 300)
        return () => clearTimeout(t)
    }, [])

    const menuItemsAdmin = [
        { id: '/', label: 'Главный экран', icon: LayoutDashboard },
        { id: '/devices', label: 'Управление устройствами', icon: TowerControl },
        { id: '/monitoring', label: 'IoT Мониторинг', icon: ChartNoAxesCombined },
        { id: '/environmental-effect', label: 'Экологический эффект', icon: Sprout },
        { id: '/notifications', label: 'Уведомления', icon: Bell },
        { id: '/settings', label: 'Настройки', icon: Settings },
        
    ]

    const menuItemsClient = [
        { id: '/', label: 'Dashboard', icon: LayoutDashboard },
    ]

    const menuItems = role === 'admin' ? menuItemsAdmin : menuItemsClient

    if (loading) {
        return (
            <aside className="sticky top-0 left-0 hidden lg:flex flex-col w-[257px] h-[411px] bg-white shadow-lg rounded-b-lg">
                <div className="flex-1 p-4 space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-11 rounded-lg bg-gray-200 animate-pulse" />
                    ))}
                </div>
            </aside>
        )
    }

   const handleLogout = () => {
     dispatch(clearToken())
     navigate('/login')
   }

    return (
        <>
            <aside className="sticky top-0 left-0 flex-col hidden w-[257px] h-[411px] overflow-y-auto bg-white rounded-b-lg shadow-lg lg:flex">
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon as any
                        return (
                            <NavLink
                                key={item.id}
                                to={item.id || '/'}
                                className={({ isActive }) => `w-full flex items-center gap-3 px-2 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-[#1E7F43]' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <Icon className="w-5 h-5" />
                                <span className="text-[14px]">{item.label}</span>
                            </NavLink>
                        )
                    })}
                </nav>
                <div className="w-[230px] h-10 m-auto flex items-center gap-2 mb-5 px-4 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                    <LogOut className="w-5 h-5 text-red-500 " />
                    <Button onClick={handleLogout} className="text-red-500 text-lg ">Выйти</Button>
                </div>
            </aside>

            <div className={`fixed inset-0 z-30 lg:hidden transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="fixed inset-0 top-[87px] bg-black/50" onClick={onClose} />

                <aside className="fixed top-[87px] left-0 bottom-0 w-64 bg-white p-4 z-40 shadow-lg">
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon as any
                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.id || '/'}
                                    onClick={onClose}
                                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] ${isActive ? 'text-[#1E7F43] bg-gray-100' : 'text-[#8E8E93] hover:bg-gray-50'}`}>
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </NavLink>
                            )
                        })}
                    </nav>
                    <div className=" h-10 m-auto flex items-center gap-2 mb-5 px-4 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
                        <LogOut className="w-5 h-5 text-red-500 " />
                        <Button onClick={handleLogout} className="text-red-500">Выйти</Button>
                    </div>
                </aside>
            </div>
        </>
    )
}
