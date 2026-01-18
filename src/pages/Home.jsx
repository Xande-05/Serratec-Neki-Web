import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listarEventos, deletarEvento } from '../service/api';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import './Home.css';

function Home() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      carregarEventos();
    }
  }, [user]);

  const carregarEventos = async () => {
    setLoading(true);
    setErro('');
    
    try {
      const data = await listarEventos();
      setEventos(data);
    } catch (error) {
      setErro('Erro ao carregar eventos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAbrirModal = (evento = null) => {
    setEventoEditando(evento);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setEventoEditando(null);
  };

  const handleSalvarEvento = () => {
    carregarEventos();
    setTermoBusca('');
    handleFecharModal();
  };

  const handleDeletarEvento = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este evento?')) {
      return;
    }

    try {
      await deletarEvento(id);
      carregarEventos();
      setTermoBusca('');
    } catch (error) {
      alert('Erro ao deletar evento');
      console.error(error);
    }
  };

  const eventosFiltrados = eventos.filter(evento =>
    evento.nome?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="home-container">
      <Header />

      <main className="home-content">
        <div className="home-header">
          <div>
            <h1>Meus Eventos</h1>
            <p>Gerencie todos os seus eventos em um só lugar</p>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar evento por nome..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="search-input"
            />
            <button className="btn-adicionar" onClick={() => handleAbrirModal()}>
              + Adicionar Evento
            </button>
          </div>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Carregando eventos...</p>
          </div>
        )}

        {erro && (
          <div className="erro-message">
            {erro}
          </div>
        )}

        {!loading && !erro && eventos.length === 0 && (
          <div className="vazio">
            <div className="vazio-icon">📅</div>
            <h2>Nenhum evento cadastrado</h2>
            <p>Comece criando seu primeiro evento!</p>
            <button className="btn-criar-primeiro" onClick={() => handleAbrirModal()}>
              Criar Primeiro Evento
            </button>
          </div>
        )}

        {!loading && !erro && eventos.length > 0 && (
          <>
            {eventosFiltrados.length === 0 && termoBusca ? (
              <div className="vazio">
                <div className="vazio-icon">🔍</div>
                <h2>Nenhum evento encontrado</h2>
                <p>Tente outra palavra-chave.</p>
              </div>
            ) : (
              <div className="eventos-grid">
                {eventosFiltrados.map((evento) => (
                  <EventCard
                    key={evento.id}
                    evento={evento}
                    onEditar={() => handleAbrirModal(evento)}
                    onDeletar={() => handleDeletarEvento(evento.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {modalAberto && (
        <EventModal
          evento={eventoEditando}
          onFechar={handleFecharModal}
          onSalvar={handleSalvarEvento}
          adminId={user?.id}
        />
      )}
    </div>
  );
}

export default Home;