import { body } from 'express-validator'

export const registerValidation = [
  body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('email').trim().isEmail().withMessage('Email inválido'),
  body('senha')
    .isLength({ min: 6 })
    .withMessage('Senha deve conter ao menos 6 caracteres')
]

export const loginValidation = [
  body('email').trim().isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória')
]
