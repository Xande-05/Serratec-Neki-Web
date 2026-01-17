import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <h2>🎫 Gerenciador de Eventos</h2>
        </div>

        <div className="header-user">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <div className="user-details">
              <span className="user-name">{user?.nome}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          
          <button className="btn-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;