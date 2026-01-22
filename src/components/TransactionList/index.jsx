function TransactionList({ transacoes, onDeleteTransaction, onEditTransaction }) {
  if (!transacoes || transacoes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 text-center text-gray-500 dark:text-gray-400 transition-colors">
        Nenhuma transação cadastrada ainda.
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Transações
      </h2>

      <ul className="space-y-3">
        {transacoes.map((transacao) => (
          <li
            key={transacao.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border-l-4 gap-2 sm:gap-4 ${
              transacao.tipo === 'receita'
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                : 'border-red-500 bg-red-50 dark:bg-red-900/30'
            }`}
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                {transacao.descricao}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {transacao.categoria} • {transacao.data}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span
                className={`font-bold text-sm sm:text-base ${
                  transacao.tipo === 'receita' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => onEditTransaction(transacao)}
                  className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                  title="Editar"
                >
                  ✏️
                </button>

                <button
                  onClick={() => onDeleteTransaction(transacao)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList