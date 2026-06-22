import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx'; // ◄ ADICIONADO: Importação do contexto global
import './Nav.css'; 

export default function Nav() { // ◄ Removida a prop "usuario" para usar o contexto dinâmico
  const { user } = useUser(); // ◄ ADICIONADO: Consome o estado global do usuário
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Fecha o menu se o usuário clicar em qualquer outro lugar da tela
  useEffect(() => {
    function cliqueFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener('mousedown', cliqueFora);
    return () => document.removeEventListener('mousedown', cliqueFora);
  }, []);

  const handleSair = () => {
    localStorage.clear(); // Limpa as campanhas e dados de login
    navigate('/');        // Redireciona para a tela de login
  };

  return (
    <div className="menu-lateral">
      <div className="topo-menu">
        <h2 className="titulo-menu">Campanhas</h2>
      </div>

      <ul className="lista-links">
        <li>
          <Link to="/arquivos" className="link-item">
            Arquivos da Ordem
          </Link>
        </li>
      </ul>

      {/* BASE DO MENU */}
      <div className="rodape-menu" ref={menuRef}>
        <hr className="linha-divisoria" />
        
        <div className="perfil-container">
          <div className="perfil-usuario">
            
            {/* AVATAR ATUALIZADO: Mostra o preview da imagem ou a letra inicial */}
            <div className="avatar">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Foto de Perfil" className="imagem-foto-perfil-nav" />
              ) : (
                user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'
              )}
            </div>

            {/* TEXTO ATUALIZADO: Mostra o @username se existir, senão mostra o Nome */}
            <span className="texto-ola">
              Olá, <strong className="nome-destaque">
                {user?.username ? `@${user.username.toLowerCase()}` : (user?.nome || 'visitante')}
              </strong>
            </span>
          </div>

          {/* Botão de Opções (Três Pontinhos) */}
          <button 
            className={`botao-opcoes-perfil ${menuAberto ? 'ativo' : ''}`}
            onClick={() => setMenuAberto(!menuAberto)}
            title="Opções da conta"
          >
            ⋮
          </button>

          {/* Menu Dropdown que abre para CIMA */}
          {menuAberto && (
            <div className="dropdown-dropup">
              <button 
                onClick={() => { setMenuAberto(false); navigate('/configuracoes'); }} 
                className="dropdown-item"
              >
                Configurações
              </button>
              <button onClick={handleSair} className="dropdown-item item-sair">
                Sair da Conta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}