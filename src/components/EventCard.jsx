import './EventCard.css';

function EventCard({ evento, onEditar, onDeletar }) {
  
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <img 
          src={evento.imagemUrl || 'https://via.placeholder.com/400x200?text=Sem+Imagem'} 
          alt={evento.nome}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=Imagem+Indisponível';
          }}
        />
      </div>

      <div className="event-content">
        <h3 className="event-title">{evento.nome}</h3>

        <div className="event-info">
          <div className="info-item">
            <span className="info-icon">📅</span>
            <span className="info-text">{formatarData(evento.data)}</span>
          </div>

          <div className="info-item">
            <span className="info-icon">📍</span>
            <span className="info-text">{evento.localizacao}</span>
          </div>
        </div>

        <div className="event-actions">
          <button className="btn-editar" onClick={onEditar}>
            ✏️ Editar
          </button>
          <button className="btn-deletar" onClick={onDeletar}>
            🗑️ Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;