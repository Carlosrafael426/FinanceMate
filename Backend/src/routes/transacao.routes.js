import { Router } from 'express'
import { listar, criar, atualizar, deletar } from '../controllers/transacao.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateRequest } from '../middlewares/validation.middleware.js'
import { transacaoValidation } from '../validators/transacao.validators.js'

const router = Router()

// Todas as rotas precisam de autenticação
router.use(authMiddleware)

router.get('/', listar)
router.post('/', transacaoValidation, validateRequest, criar)
router.put('/:id', transacaoValidation, validateRequest, atualizar)
router.delete('/:id', deletar)

export default router