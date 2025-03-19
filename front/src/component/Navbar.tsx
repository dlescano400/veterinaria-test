export const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white flex px-5 col-span-2 justify-end">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center pr-2flex justify-end">
            <div className="flex shrink-0 items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Your Company" />
            </div>
          </div>
        </div>
    </nav>
  )
}