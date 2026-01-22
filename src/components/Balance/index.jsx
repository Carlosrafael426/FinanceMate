function Balance({ receitas, despesas }) {
  const saldo = receitas - despesas

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Resumo</h2>
      
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
  )
}

export default Balance