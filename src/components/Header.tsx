import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isAuthorized = localStorage.getItem('isAuthorized') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthorized');
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? 'text-blue-400' : 'text-white'} mr-4 hover:text-blue-200`;

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <NavLink to="/" className="text-xl font-bold">
            MovieApp
          </NavLink>
        </div>
        <div>
          <NavLink to="/movies" className={linkClass}>
            Movies
          </NavLink>
          {!isAuthorized ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Log In
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                sign Up
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
