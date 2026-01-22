import Transacao from '../models/Transacao.js'

// Listar transações do usuário
export async function listar(req, res) {
  try {
    const transacoes = await Transacao.find({ usuario: req.userId })
      .sort({ createdAt: -1 })

    res.json(transacoes)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar transações' })
  }
}

// Criar transação
export async function criar(req, res) {
  try {
    const { descricao, valor, tipo, categoria, data } = req.body

    const transacao = await Transacao.create({
      descricao,
      valor,
      tipo,
      categoria,
      data,
      usuario: req.userId
    })

    res.status(201).json(transacao)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação' })
  }
}

// Atualizar transação
export async function atualizar(req, res) {
  try {
    const { id } = req.params
    const { descricao, valor, tipo, categoria, data } = req.body

    const transacao = await Transacao.findOneAndUpdate(
      { _id: id, usuario: req.userId },
      { descricao, valor, tipo, categoria, data },
      { new: true }
    )

    if (!transacao) {
      return res.status(404).json({ error: 'Transação não encontrada' })
    }

    res.json(transacao)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar transação' })
  }
}

// Deletar transação
export async function deletar(req, res) {
  try {
    const { id } = req.params

    const transacao = await Transacao.findOneAndDelete({
      _id: id,
      usuario: req.userId
    })

    if (!transacao) {
      return res.status(404).json({ error: 'Transação não encontrada' })
    }

    res.json({ message: 'Transação deletada com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação' })
  }
}