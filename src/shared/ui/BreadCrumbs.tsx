import { Link, useLocation } from 'react-router-dom'

const labelMap: Record<string, string> = {
    '/': 'Главный экран',
    '/devices': 'Управление устройствами',
    '/monitoring': 'IoT Мониторинг',
    '/environmental-effect': 'Экологический эффект',
    '/notifications': 'Уведомления',
    '/settings': 'Настройки',
    '/profile': 'Профиль',
    '/add-device':'Добавление устройства'
}

export default function BreadCrumbs() {
    const { pathname } = useLocation()
    const segments = pathname.split('/').filter(Boolean)

    const crumbs = segments.map((seg, idx) => {
        const to = '/' + segments.slice(0, idx + 1).join('/')
        return { to, label: labelMap[to] || seg }
    })

    return (
        <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <ol className="flex gap-2 items-center">
                <li>
                    <Link to="/" className="text-gray-500 hover:text-gray-700">Главный экран</Link>
                </li>
                {crumbs.map((c, i) => (
                    <li key={c.to} className="flex items-center">
                        <span className="mx-2 text-gray-300">/</span>
                        {i === crumbs.length - 1 ? (
                            <span className="text-gray-800">{c.label}</span>
                        ) : (
                            <Link to={c.to} className="text-gray-500 hover:text-gray-700">{c.label}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}