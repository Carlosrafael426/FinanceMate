import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const CORES = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#6b7280',
]

function Chart({ transacoes, tipo = 'despesa' }) {
  const transacoesFiltradas = transacoes.filter((t) => t.tipo === tipo)

  const dadosPorCategoria = transacoesFiltradas.reduce((acc, t) => {
    const categoriaExistente = acc.find((item) => item.categoria === t.categoria)
    
    if (categoriaExistente) {
      categoriaExistente.valor += t.valor
    } else {
      acc.push({ categoria: t.categoria, valor: t.valor })
    }
    
    return acc
  }, [])

  dadosPorCategoria.sort((a, b) => b.valor - a.valor)

  if (dadosPorCategoria.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center text-gray-500 dark:text-gray-400 transition-colors">
        <p>Nenhuma {tipo === 'despesa' ? 'despesa' : 'receita'} para exibir no gráfico.</p>
      </div>
    )
  }

  const total = dadosPorCategoria.reduce((acc, item) => acc + item.valor, 0)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {tipo === 'despesa' ? '📉 Despesas' : '📈 Receitas'} por Categoria
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dadosPorCategoria}
              dataKey="valor"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ categoria, percent }) => 
                `${categoria} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {dadosPorCategoria.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CORES[index % CORES.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `R$ ${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {dadosPorCategoria.map((item, index) => (
          <div key={item.categoria} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: CORES[index % CORES.length] }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.categoria}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                R$ {item.valor.toFixed(2)}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                ({((item.valor / total) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chart