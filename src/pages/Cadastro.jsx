import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cadastrarAdmin } from '../service/api';
import './Cadastro.css';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErro('');
  };

  const validarFormulario = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setErro('Todos os campos são obrigatórios!');
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem!');
      return false;
    }

    if (formData.senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      await cadastrarAdmin(formData);
      
      setSucesso('Cadastro realizado com sucesso! Redirecionando...');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setErro(error.response?.data || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="cadastro-header">
          <h1>Criar Conta</h1>
          <p>Preencha os dados para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="João Silva"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="joao@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          {erro && <div className="error-message">{erro}</div>}
          {sucesso && <div className="success-message">{sucesso}</div>}

          <button type="submit" className="btn-cadastro" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <div className="cadastro-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/" className="link-login">
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;