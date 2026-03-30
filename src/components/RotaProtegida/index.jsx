// src/components/RotaProtegida.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function RotaProtegida({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RotaProtegida