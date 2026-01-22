import { Router } from 'express'
import { registrar, login, getUsuario } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/registrar', registrar)
router.post('/login', login)
router.get('/usuario', authMiddleware, getUsuario)

export default router
