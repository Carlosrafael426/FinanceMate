import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import Logo from '../../assets/FMLogo.png'

// ... resto do código continua igual

function Header() {
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <header className="bg-lime-400 dark:bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={Logo} alt="logo" className="h-10" />

          <div className="flex items-center gap-4">
            <nav className="flex gap-2 sm:gap-4">
              <Link
                to="/"
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  location.pathname === '/'
                    ? 'bg-blue-600 text-white'
                    : 'text-black hover:text-white dark:text-white'
                }`}
              >
                🏠 Home
              </Link>

              <Link
                to="/relatorio"
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  location.pathname === '/relatorio'
                    ? 'bg-blue-600 text-white'
                    : 'text-black hover:text-white dark:text-white'
                }`}
              >
                📊 Relatório
              </Link>
            </nav>

            {/* Botão Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header