
import './App.css'
import { Navbar } from './component/Navbar'
import { Sidebar } from './component/Sidebar'
import { Table } from './component/Table';
import { useFetch } from './hooks/useFetch';
import CreateUserForm from './component/FormsUser';

function App() {
  const { data, loading, error, refetch } = useFetch('http://localhost:3000/api/users');
  const columns = ['firstName', 'lastName', 'email', 'phone'];

  return (
    <div className="grid grid-cols-[16rem_1fr] grid-rows-[4rem_1fr] h-screen">
      <Navbar />
      <Sidebar />
      <main className="p-5 bg-gray-100">
        <div className="flex gap-4">
          <div className="flex-1">
            {loading ? 
              <p>Loading...</p>
              : <Table columns={columns} rows={data ? data : []} />
            }
            {error && <p>{error}</p>}
          </div>
          <div className="w-96">
            <CreateUserForm onSuccess={refetch} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
