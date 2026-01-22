import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Configurar caminho do .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import authRoutes from './routes/auth.routes.js'
import transacaoRoutes from './routes/transacao.routes.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/transacoes', transacaoRoutes)

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🚀 API FinanceMate funcionando!' })
})

// Conectar ao MongoDB
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financemate'

console.log('🔧 Porta:', PORT)
console.log('🔧 MongoDB URI:', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message)
  })