// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_URL = 'https://financemate-api.onrender.com/api'

function Login({onLogin}) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Email ou senha inválidos')
      }

      onLogin(data.token, data.usuario)
      
      navigate('/')
      
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="../../assets/FMLogo.png" alt="logo" />
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Controle suas finanças de forma simples
          </p>
        </div>

        {/* Card do formulário */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Entrar na conta
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>
            
            {erro && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 
                            text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {erro}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={carregando}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 
                       disabled:bg-emerald-400 disabled:cursor-not-allowed
                       text-white font-semibold rounded-lg shadow-md
                       transition-all duration-200 transform hover:scale-[1.02]"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Não tem conta?{' '}
            <Link 
              to="/registrar" 
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login