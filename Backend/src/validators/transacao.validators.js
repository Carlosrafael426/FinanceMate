import { body } from 'express-validator'

export const transacaoValidation = [
  body('descricao').trim().notEmpty().withMessage('Descrição é obrigatória'),
  body('valor')
    .notEmpty()
    .withMessage('Valor é obrigatório')
    .isFloat({ gt: 0 })
    .withMessage('Valor deve ser maior que zero'),
  body('tipo')
    .trim()
    .isIn(['receita', 'despesa'])
    .withMessage('Tipo inválido'),
  body('categoria').trim().notEmpty().withMessage('Categoria é obrigatória'),
  body('data')
    .notEmpty()
    .withMessage('Data é obrigatória')
    .isISO8601()
    .withMessage('Data inválida')
]
