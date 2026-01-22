// src/services/api.js
const API_URL = 'http://localhost:3001/api'

// Pegar o token do localStorage
function getToken() {
  return localStorage.getItem('token')
}

// TRANSAÇÕES
export async function buscarTransacoes() {
  const response = await fetch(`${API_URL}/transacoes`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })
  
  if (!response.ok) {
    throw new Error('Erro ao buscar transações')
  }
  
  return response.json()
}

export async function criarTransacao(dados) {
  const response = await fetch(`${API_URL}/transacoes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(dados)
  })
  
  if (!response.ok) {
    throw new Error('Erro ao criar transação')
  }
  
  return response.json()
}

export async function atualizarTransacao(id, dados) {
  const response = await fetch(`${API_URL}/transacoes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(dados)
  })
  
  if (!response.ok) {
    throw new Error('Erro ao atualizar transação')
  }
  
  return response.json()
}

export async function deletarTransacao(id) {
  const response = await fetch(`${API_URL}/transacoes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })
  
  if (!response.ok) {
    throw new Error('Erro ao deletar transação')
  }
  
  return response.json()
}