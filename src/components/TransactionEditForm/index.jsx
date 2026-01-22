import { useState } from 'react'
import { CATEGORIAS } from '../../constants/categorias'

function TransactionEditForm({ transacao, onSave, onCancel }) {
  const [descricao, setDescricao] = useState(transacao?.descricao || '')
  const [valor, setValor] = useState(transacao?.valor?.toString() || '')
  const [tipo, setTipo] = useState(transacao?.tipo || 'receita')
  const [categoria, setCategoria] = useState(transacao?.categoria || '')
  const [data, setData] = useState(transacao?.data || '')

  const categoriasDisponiveis = CATEGORIAS[tipo]

  function handleTipoChange(novoTipo) {
    setTipo(novoTipo)
    setCategoria('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!descricao || !valor || !categoria || !data) {
      alert('Preencha todos os campos!')
      return
    }

    const transacaoAtualizada = {
      ...transacao,
      descricao,
      valor: parseFloat(valor),
      tipo,
      categoria,
      data
    }

    onSave(transacaoAtualizada)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        ✏️ Editar Transação
      </h2>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Valor</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            step="0.01"
            min="0"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => handleTipoChange(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Categoria</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione uma categoria</option>
          {categoriasDisponiveis.map((cat) => (
            <option key={cat.valor} value={cat.valor}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Data</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}

export default TransactionEditForm