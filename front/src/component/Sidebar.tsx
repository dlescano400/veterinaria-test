export const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-4">Menú</h1>
      <nav>
        <ul>
          <li className="mb-2"><a href="#" className="block p-2 rounded hover:bg-gray-700">Inicio</a></li>
          <li className="mb-2"><a href="#" className="block p-2 rounded hover:bg-gray-700">Servicios</a></li>
          <li className="mb-2"><a href="#" className="block p-2 rounded hover:bg-gray-700">Contacto</a></li>
        </ul>
      </nav>
    </aside>
  )
}