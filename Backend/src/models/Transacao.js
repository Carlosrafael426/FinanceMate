import mongoose from 'mongoose'

const transacaoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true
  },
  valor: {
    type: Number,
    required: [true, 'Valor é obrigatório'],
    min: [0, 'Valor deve ser positivo']
  },
  tipo: {
    type: String,
    required: [true, 'Tipo é obrigatório'],
    enum: ['receita', 'despesa']
  },
  categoria: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    trim: true
  },
  data: {
    type: String,
    required: [true, 'Data é obrigatória']
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Transacao', transacaoSchema)