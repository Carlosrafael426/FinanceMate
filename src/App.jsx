// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ConfirmModal from "./components/ConfirmModal";
import TransactionEditForm from "./components/TransactionEditForm";
import RotaProtegida from "./components/RotaProtegida";
import Home from "./pages/Home";
import Relatorio from "./pages/Relatorio";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import {
  buscarTransacoes,
  criarTransacao,
  atualizarTransacao,
  deletarTransacao,
} from "./services/api";

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [transacaoEditando, setTransacaoEditando] = useState(null);
  const [transacaoDeletando, setTransacaoDeletando] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // ✅ DEPOIS (atualiza)
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Buscar transações quando logar
  useEffect(() => {
    if (token) {
      carregarTransacoes();
    }
  }, [token]);

  async function carregarTransacoes() {
    try {
      setCarregando(true);
      const data = await buscarTransacoes();
      setTransacoes(data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setCarregando(false);
    }
  }

  async function handleAddTransaction(novaTransacao) {
    try {
      const transacaoCriada = await criarTransacao(novaTransacao);
      setTransacoes([transacaoCriada, ...transacoes]);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      alert("Erro ao criar transação");
    }
  }

  function handleLogin(novoToken, usuario) {
    localStorage.setItem("token", novoToken);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(novoToken);
  }

  function handleDeleteClick(transacao) {
    setTransacaoDeletando(transacao);
  }

  async function handleConfirmDelete() {
    try {
      await deletarTransacao(transacaoDeletando._id);
      setTransacoes(transacoes.filter((t) => t._id !== transacaoDeletando._id));
      setTransacaoDeletando(null);
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      alert("Erro ao deletar transação");
    }
  }

  function handleEditTransaction(transacao) {
    setTransacaoEditando(transacao);
  }

  async function handleSaveEdit(transacaoAtualizada) {
    try {
      const atualizada = await atualizarTransacao(
        transacaoAtualizada._id,
        transacaoAtualizada,
      );
      setTransacoes(
        transacoes.map((t) => (t._id === atualizada._id ? atualizada : t)),
      );
      setTransacaoEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      alert("Erro ao atualizar transação");
    }
  }

  function handleCloseEditModal() {
    setTransacaoEditando(null);
  }

  function handleCloseDeleteModal() {
    setTransacaoDeletando(null);
  }

  // Função de logout
  function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  setToken(null)  // ← Isso faz o Header sumir
}

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {token && <Header onLogout={handleLogout} />}

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registrar" element={<Cadastro onLogin={handleLogin} />}  />

          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <RotaProtegida>
                <Home
                  transacoes={transacoes}
                  carregando={carregando}
                  onAddTransaction={handleAddTransaction}
                  onDeleteTransaction={handleDeleteClick}
                  onEditTransaction={handleEditTransaction}
                />
              </RotaProtegida>
            }
          />
          <Route
            path="/relatorio"
            element={
              <RotaProtegida>
                <Relatorio transacoes={transacoes} />
              </RotaProtegida>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
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
  );
}

export default App;
