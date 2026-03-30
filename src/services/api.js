const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  const headers = {
    ...(options.headers || {}),
    ...(options.body ? { 'Content-Type': 'application/json' } : {})
  }

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!response.ok) {
    const message = data?.error || data?.message || response.statusText || 'Erro na requisição'
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return data
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function login(email, senha) {
  return request('/auth/login', {
    method: 'POST',
    body: { email, senha }
  })
}

export async function register(nome, email, senha) {
  return request('/auth/registrar', {
    method: 'POST',
    body: { nome, email, senha }
  })
}

export async function fetchUsuario() {
  return request('/auth/usuario', {
    headers: authHeaders()
  })
}

// TRANSAÇÕES
export async function buscarTransacoes() {
  return request('/transacoes', {
    headers: authHeaders()
  })
}

export async function criarTransacao(dados) {
  return request('/transacoes', {
    method: 'POST',
    headers: authHeaders(),
    body: dados
  })
}

export async function atualizarTransacao(id, dados) {
  return request(`/transacoes/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: dados
  })
}

export async function deletarTransacao(id) {
  return request(`/transacoes/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
}
