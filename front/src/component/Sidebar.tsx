import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Menú</h1>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/" className="block p-2 rounded hover:bg-gray-700">Inicio</Link>
          </li>
          <li className="mb-2">
            <Link to="/users" className="block p-2 rounded hover:bg-gray-700">Usuarios</Link>
          </li>
          <li className="mb-2">
            <Link to="/pets" className="block p-2 rounded hover:bg-gray-700">Mascotas</Link>
          </li>
          <li className="mb-2">
            <Link to="/payments" className="block p-2 rounded hover:bg-gray-700">Pagos</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}