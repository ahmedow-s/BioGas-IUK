
import { Link } from 'react-router'
import { type ForwardRefExoticComponent, useEffect, useState } from 'react'
import { Bell, Building2,ChartNoAxesCombined, LayoutDashboard, LogOut, MapPin,Plus, Settings, SproutIcon, TowerControl, } from 'lucide-react'
import Button from '../shared/ui/Button'

interface SidebarProps {
  activeSection?: string
  setActiveSection?: (s: string) => void
  mobileOpen?: boolean
  onClose?: () => void
  onToggle?: () => void
}

interface LucideProps {
  className?: string
}

export function Sidebar({
  activeSection,
  setActiveSection,
  mobileOpen,
  onClose,
}: SidebarProps) {
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const checkAuth = () => {
      setTimeout(() => {
        setRole('admin') 
        setLoading(false)
      }, 1000)
    }

  useEffect(() => {
    checkAuth()
  }, [])

  const menuItemsAdmin = [
    { id: '', label: 'Главный экран', icon: LayoutDashboard },
    { id: '/devices', label: 'Управление устройствами', icon: TowerControl },
    { id: '/monitoring', label: 'IoT Мониторинг', icon: ChartNoAxesCombined },
    { id: '/environmental-effect', label: 'Экологический эффект', icon: SproutIcon },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: '/settings', label: 'Настройки', icon: Settings },
  ]

  const menuItemsClient = [
    { id: '', label: 'Dashboard', icon: LayoutDashboard },
    { id: '', label: 'Добавить тур', icon: Plus },
    { id: '', label: 'Туры', icon: MapPin },
    { id: '', label: 'Компании', icon: Building2 },
  ]

  let menuItems: {
    id: string
    label: string
    icon: string | ForwardRefExoticComponent<Omit<LucideProps, 'ref'>>
  }[] = []

  if (role === 'admin') menuItems = menuItemsAdmin
  if (role === 'client') menuItems = menuItemsClient

  if (loading) {
    return (
      <aside className="sticky top-0 left-0 hidden lg:flex flex-col w-[257px] h-[411px] bg-white shadow-lg rounded-b-lg">
        <div className="flex-1 p-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-11 rounded-lg bg-gray-200  animate-pulse"
            />
          ))}
        </div>
      </aside>
    )
  }


  const handleLogOut = () => {
    // Реализуйте логику выхода из системы, например, очистку токенов и перенаправление на страницу входа
    console.log('Выход из системы')
  }


  return (
    <>
      <aside className="sticky top-0 left-0 flex-col hidden w-[257px] h-[411px] overflow-y-auto bg-white rounded-b-lg  shadow-lg lg:flex ">
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon
            const active = activeSection === item.id

            if (setActiveSection) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'text-[#1E7F43] '
                      : 'text-gray-700 text-left hover:bg-gray-100 '
                  }`}
                >
                 <Icon className="w-5 h-5 text-[#1E7F43]" />
                  <span>{item.label}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`w-full flex items-center gap-3 px-2 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 text-[#1E7F43]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className='text-[14px]'>{item.label}</span>
              </Link>
            )
          })}
        </nav>
           <div className="w-[230px] h-10 m-auto flex items-center gap-2 mb-5 px-4 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
            <LogOut className="w-5 h-5 text-red-500 " />
            <Button onClick={handleLogOut} className='text-red-500 text-lg '>Выйти</Button>
          </div>
      </aside>

      <div
        className={`fixed inset-0 z-30 lg:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />

        <aside className="absolute top-12 left-0 bottom-0 w-full bg-white  p-4 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  to={`/${item.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] text-[#8E8E93] hover:bg-gray-50 "
                >
                  <Icon className="w-5 h-5" />
                  <span >{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="p-4">
            <LogOut className="w-5 h-5 text-[#8E8E93] mb-2" />
            <Button className=''>Выйти</Button>
          </div>
        </aside>
      </div>
    </>
  )
}
