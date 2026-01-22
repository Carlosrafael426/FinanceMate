import Balance from '../../components/Balance'
import TransactionForm from '../../components/TransactionForm'
import TransactionList from '../../components/TransactionList'

function Home({ transacoes = [], onAddTransaction, onDeleteTransaction, onEditTransaction }) {
  const receitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0)

  const despesas = transacoes
    .filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0)

  return (
    <div className="space-y-6">
      <Balance receitas={receitas} despesas={despesas} />
      <TransactionForm onAddTransaction={onAddTransaction} />
      <TransactionList
        transacoes={transacoes}
        onDeleteTransaction={onDeleteTransaction}
        onEditTransaction={onEditTransaction}
      />
    </div>
  )
}

export default Home