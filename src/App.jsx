import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Modal from './components/Modal'
import ConfirmModal from './components/ConfirmModal'
import TransactionEditForm from './components/TransactionEditForm'
import Home from './pages/Home'
import Relatorio from './pages/Relatorio'

function App() {
  const [transacoes, setTransacoes] = useState([])
  const [transacaoEditando, setTransacaoEditando] = useState(null)
  const [transacaoDeletando, setTransacaoDeletando] = useState(null)

  function handleAddTransaction(novaTransacao) {
    setTransacoes([novaTransacao, ...transacoes])
  }

  function handleDeleteClick(transacao) {
    setTransacaoDeletando(transacao)
  }

  function handleConfirmDelete() {
    setTransacoes(transacoes.filter((t) => t.id !== transacaoDeletando.id))
    setTransacaoDeletando(null)
  }

  function handleEditTransaction(transacao) {
    setTransacaoEditando(transacao)
  }

  function handleSaveEdit(transacaoAtualizada) {
    setTransacoes(
      transacoes.map((t) =>
        t.id === transacaoAtualizada.id ? transacaoAtualizada : t
      )
    )
    setTransacaoEditando(null)
  }

  function handleCloseEditModal() {
    setTransacaoEditando(null)
  }

  function handleCloseDeleteModal() {
    setTransacaoDeletando(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                transacoes={transacoes}
                onAddTransaction={handleAddTransaction}
                onDeleteTransaction={handleDeleteClick}
                onEditTransaction={handleEditTransaction}
              />
            }
          />
          <Route
            path="/relatorio"
            element={<Relatorio transacoes={transacoes} />}
          />
        </Routes>
      </main>

      <Modal isOpen={!!transacaoEditando} onClose={handleCloseEditModal}>
        <TransactionEditForm
          transacao={transacaoEditando}
          onSave={handleSaveEdit}
          onCancel={handleCloseEditModal}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!transacaoDeletando}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        titulo="Excluir Transação?"
        mensagem={`Tem certeza que deseja excluir "${transacaoDeletando?.descricao}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
}

export default App