import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
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
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

// Middlewares
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || true }))
app.use(express.json({ limit: '10kb' }))
app.use(morgan('tiny'))

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/transacoes', transacaoRoutes)

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🚀 API FinanceMate funcionando!' })
})

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// Middleware de erro global
app.use(errorHandler)

// Conectar ao MongoDB
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/financemate'

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET não definido. Defina a variável de ambiente no arquivo .env.')
  process.exit(1)
}

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