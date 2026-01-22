import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  try {
    // Pegar o token do header
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }

    // Token vem como "Bearer TOKEN"
    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token mal formatado' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token mal formatado' })
    }

    // Verificar o token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' })
      }

      // Salvar o ID do usuário na requisição
      req.userId = decoded.id
      return next()
    })
  } catch (error) {
    return res.status(401).json({ error: 'Erro na autenticação' })
  }
}