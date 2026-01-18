import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fazerLogin } from '../service/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [salvarSenha, setSalvarSenha] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setSenha(savedPassword);
      setSalvarSenha(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = await fazerLogin({ email, senha });
      
      login(response);

      if (salvarSenha) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', senha);
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
      }

      navigate('/home');
    } catch (error) {
      setErro(error.response?.data || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Bem-vindo!</h1>
          <p>Faça login para gerenciar seus eventos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email do Administrador</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="salvarSenha"
              checked={salvarSenha}
              onChange={(e) => setSalvarSenha(e.target.checked)}
            />
            <label htmlFor="salvarSenha">Gravar senha</label>
          </div>

          {erro && <div className="error-message">{erro}</div>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="login-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="link-cadastro">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;