import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Inicio', icon: '🏠' },
  { path: '/users', label: 'Usuarios', icon: '👥' },
  { path: '/pets', label: 'Mascotas', icon: '🐾' },
  { path: '/payments', label: 'Pagos', icon: '💳' },
]

export const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="bg-[#16162a] text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-pink-400 tracking-wide">
        patitas<span className="text-white">++</span>
      </h1>
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-pink-500/20 text-pink-400 border-l-2 border-pink-500 shadow-[0_0_10px_rgba(255,105,180,0.3)]'
                      : 'hover:bg-pink-500/10 hover:text-pink-300 text-gray-300 hover:border-l-2 hover:border-pink-500/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="pt-4 border-t border-pink-500/20 mt-4">
        <p className="text-xs text-gray-500 text-center">v1.0.0</p>
      </div>
    </aside>
  )
}