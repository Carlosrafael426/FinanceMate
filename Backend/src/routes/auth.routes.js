import { Router } from 'express'
import { registrar, login, getUsuario } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validateRequest } from '../middlewares/validation.middleware.js'
import { loginValidation, registerValidation } from '../validators/auth.validators.js'

const router = Router()

router.post('/registrar', registerValidation, validateRequest, registrar)
router.post('/login', loginValidation, validateRequest, login)
router.get('/usuario', authMiddleware, getUsuario)

export default router
