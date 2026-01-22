import { Router } from 'express'
import { listar, criar, atualizar, deletar } from '../controllers/transacao.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

// Todas as rotas precisam de autenticação
router.use(authMiddleware)

router.get('/', listar)
router.post('/', criar)
router.put('/:id', atualizar)
router.delete('/:id', deletar)

export default router