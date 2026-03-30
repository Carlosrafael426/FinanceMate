import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import Logo from '../../assets/FMLogo.png'
import { useAuth } from '../../hooks/useAuth'
import { login as loginRequest } from '../../services/api'
import FeedbackModal from '../../components/FeedbackModal'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackTitle, setFeedbackTitle] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const data = await loginRequest(email, senha)
      login(data)
      setFeedbackTitle('Login realizado com sucesso!')
      setFeedbackMessage('Você será redirecionado ao painel em instantes.')
      setFeedbackOpen(true)
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  function handleCloseFeedback() {
    setFeedbackOpen(false)
    navigate('/')
  }

  if (isAuthenticated && !feedbackOpen) {
    return <Navigate to='/' replace />
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center shadow-inner">
            <img src={Logo} alt="logo" className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-semibold text-white mb-2">Entre na sua conta</h1>
          <p className="text-slate-300">Acesse seu painel e comece a controlar suas finanças.</p>
        </div>

        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-3xl shadow-2xl border border-white/10 p-8">
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
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-800 
                       disabled:bg-emerald-400 disabled:cursor-not-allowed
                       text-white font-semibold rounded-lg shadow-md
                       transition-all duration-200 transform hover:scale-[1.02]"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <p className="text-center mt-6 text-slate-500 dark:text-slate-400">
            Não tem conta?{' '}
            <Link 
              to="/registrar" 
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={handleCloseFeedback}
        title={feedbackTitle}
        message={feedbackMessage}
        type="success"
      />
    </div>
  )
}

export default Login