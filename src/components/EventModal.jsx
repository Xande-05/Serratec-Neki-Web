import { useState, useEffect } from 'react';
import { criarEvento, atualizarEvento } from '../service/api';
import './EventModal.css';

function EventModal({ evento, onFechar, onSalvar }) {
  const [formData, setFormData] = useState({
    nome: '',
    data: '',
    localizacao: '',
    imagemUrl: '',
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const isEdicao = !!evento;

  useEffect(() => {
    if (evento) {
      const dataFormatada = evento.data ? evento.data.slice(0, 16) : '';
      
      setFormData({
        nome: evento.nome || '',
        data: dataFormatada,
        localizacao: evento.localizacao || '',
        imagemUrl: evento.imagemUrl || '',
      });
    }
  }, [evento]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'data') {
    const ano = value.substring(0, 4);
  
    if (ano.length > 4) {
    }
  }

  setFormData({
    ...formData,
    [name]: value,
  });
  setErro('');
};

  const validarFormulario = () => {
    if (!formData.nome || !formData.data || !formData.localizacao) {
      setErro('Nome, data e localização são obrigatórios!');
      return false;
    }

    const ano = new Date(formData.data).getFullYear();
    if (ano < 1900 || ano > 2100) {
      setErro('Por favor, insira um ano válido (entre 1900 e 2100).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      const dataFormatada = formData.data + ':00';

      const eventoData = {
        nome: formData.nome,
        data: dataFormatada,
        localizacao: formData.localizacao,
        imagemUrl: formData.imagemUrl || null,
      };

      if (isEdicao) {
        await atualizarEvento(evento.id, {
          data: dataFormatada,
          localizacao: formData.localizacao,
        });
      } else {
        await criarEvento(eventoData );
      }

      onSalvar();
    } catch (error) {
      setErro(error.response?.data || 'Erro ao salvar evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdicao ? 'Editar Evento' : 'Novo Evento'}</h2>
          <button className="btn-fechar" onClick={onFechar}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nome">Nome do Evento *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Show de Rock"
              disabled={isEdicao}
              required
            />
            {isEdicao && (
              <small className="form-hint">O nome não pode ser editado</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="data">Data e Hora *</label>
            <input
              type="datetime-local"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              min="1900-01-01T00:00"
              max="9999-12-31T23:59"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="localizacao">Localização *</label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              placeholder="Ex: Rio de Janeiro"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagemUrl">URL da Imagem</label>
            <input
              type="url"
              id="imagemUrl"
              name="imagemUrl"
              value={formData.imagemUrl}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
              disabled={isEdicao}
            />
            {isEdicao && (
              <small className="form-hint">A imagem não pode ser editada</small>
            )}
          </div>

          {erro && <div className="error-message">{erro}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onFechar}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-salvar"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;