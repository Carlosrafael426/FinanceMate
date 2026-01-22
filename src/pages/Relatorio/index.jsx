import { useState, useMemo } from 'react'
import Chart from '../../components/Chart'
import ExportButtons from '../../components/ExportButtons'

function Relatorio({ transacoes }) {
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('')
  const [ordenacao, setOrdenacao] = useState('data-desc')

  const categorias = useMemo(() => {
    const cats = transacoes.map((t) => t.categoria)
    return [...new Set(cats)].sort()
  }, [transacoes])

  const transacoesFiltradas = useMemo(() => {
    let resultado = transacoes.filter((t) => {
      if (dataInicio && t.data < dataInicio) return false
      if (dataFim && t.data > dataFim) return false
      if (categoriaFiltro && t.categoria !== categoriaFiltro) return false
      if (tipoFiltro && t.tipo !== tipoFiltro) return false
      return true
    })

    resultado.sort((a, b) => {
      switch (ordenacao) {
        case 'data-desc':
          return b.data.localeCompare(a.data)
        case 'data-asc':
          return a.data.localeCompare(b.data)
        case 'valor-desc':
          return b.valor - a.valor
        case 'valor-asc':
          return a.valor - b.valor
        case 'categoria':
          return a.categoria.localeCompare(b.categoria)
        default:
          return 0
      }
    })

    return resultado
  }, [transacoes, dataInicio, dataFim, categoriaFiltro, tipoFiltro, ordenacao])

  const receitas = transacoesFiltradas
    .filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0)

  const despesas = transacoesFiltradas
    .filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0)

  const saldo = receitas - despesas

  function limparFiltros() {
    setDataInicio('')
    setDataFim('')
    setCategoriaFiltro('')
    setTipoFiltro('')
    setOrdenacao('data-desc')
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            🔍 Filtros
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={limparFiltros}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              Limpar filtros
            </button>
            <ExportButtons
              transacoes={transacoesFiltradas}
              receitas={receitas}
              despesas={despesas}
              saldo={saldo}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Data Início */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Data Início
            </label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Data Fim */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Data Fim
            </label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Categoria
            </label>
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Tipo
            </label>
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Ordenar por
            </label>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="data-desc">Data (mais recente)</option>
              <option value="data-asc">Data (mais antiga)</option>
              <option value="valor-desc">Valor (maior)</option>
              <option value="valor-asc">Valor (menor)</option>
              <option value="categoria">Categoria (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resumo do Período */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          📊 Resumo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">Receitas</p>
            <p className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-300">
              R$ {receitas.toFixed(2)}
            </p>
          </div>

          <div className="bg-red-100 dark:bg-red-900 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">Despesas</p>
            <p className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-300">
              R$ {despesas.toFixed(2)}
            </p>
          </div>

          <div className={`p-3 sm:p-4 rounded-lg ${
            saldo >= 0 
              ? 'bg-blue-100 dark:bg-blue-900' 
              : 'bg-orange-100 dark:bg-orange-900'
          }`}>
            <p className={`text-xs sm:text-sm ${
              saldo >= 0 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-orange-600 dark:text-orange-400'
            }`}>
              Saldo
            </p>
            <p className={`text-lg sm:text-xl font-bold ${
              saldo >= 0 
                ? 'text-blue-700 dark:text-blue-300' 
                : 'text-orange-700 dark:text-orange-300'
            }`}>
              R$ {saldo.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart transacoes={transacoesFiltradas} tipo="despesa" />
        <Chart transacoes={transacoesFiltradas} tipo="receita" />
      </div>

      {/* Lista de Transações */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          📋 Transações ({transacoesFiltradas.length})
        </h2>

        {transacoesFiltradas.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Nenhuma transação encontrada com os filtros selecionados.
          </p>
        ) : (
          <ul className="space-y-3">
            {transacoesFiltradas.map((transacao) => (
              <li
                key={transacao.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border-l-4 gap-2 sm:gap-4 ${
                  transacao.tipo === 'receita'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                    {transacao.descricao}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-xs mr-2">
                      {transacao.categoria}
                    </span>
                    {transacao.data}
                  </p>
                </div>

                <span
                  className={`font-bold text-sm sm:text-base ${
                    transacao.tipo === 'receita' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Relatorio