import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Gerar token JWT
function gerarToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}

// Registrar usuário
export async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body

    // Verificar se usuário já existe
    const usuarioExiste = await User.findOne({ email })

    if (usuarioExiste) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    // Criar usuário
    const usuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada
    })

    // Retornar usuário com token
    res.status(201).json({
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      },
      token: gerarToken(usuario._id)
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' })
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, senha } = req.body

    // Buscar usuário
    const usuario = await User.findOne({ email })

    if (!usuario) {
      return res.status(400).json({ error: 'Usuário não encontrado' })
    }

    // Verificar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return res.status(400).json({ error: 'Senha incorreta' })
    }

    // Retornar usuário com token
    res.json({
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      },
      token: gerarToken(usuario._id)
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' })
  }
}

// Buscar usuário logado
export async function getUsuario(req, res) {
  try {
    const usuario = await User.findById(req.userId).select('-senha')

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json(usuario)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' })
  }
}