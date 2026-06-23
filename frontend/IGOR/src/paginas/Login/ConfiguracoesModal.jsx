import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../componentes/Modal.jsx'; 
import { useUser } from '../../UserContext.jsx';
import axios from 'axios';
import './ConfiguracoesModal.css';

export default function ConfiguracoesModal() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  // Referência para o input de arquivo oculto
  const fileInputRef = useRef(null);

  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  // Estado para armazenar o preview da imagem local antes de enviar pro banco
  const [previewAvatar, setPreviewAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setNome(user.nome || '');
      setUsername(user.username || '');
      setBio(user.bio || '');
      setPreviewAvatar(user.avatarUrl || null);
    }
  }, [user]);

  const handleGatilhoUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleArquivoSelecionado = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const urlPreview = URL.createObjectURL(arquivo);
      setPreviewAvatar(urlPreview);
    }
  };

  const handleFechar = () => {
    navigate(-1);
  };

const handleSalvar = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("Erro: Usuário não identificado.");

    setCarregando(true);
    try {
      const dadosParaEnviar = {
        id: user.id,
        nome: nome,
        email: user.email || "",  
        senha: user.senha || "",  
        mensagem: username        
      };

      // Rota correta e limpa que o Spring aceitou
      const response = await axios.put(`http://localhost:8080/usuarios`, dadosParaEnviar);
      
      if (response.status === 200 || response.status === 204) {
        
        // Criamos o objeto com os dados atualizados
        const usuarioAtualizado = { 
          ...user, 
          nome: nome, 
          username: username,
          avatarUrl: previewAvatar 
        };

        // 1. Tenta atualizar pelo Contexto global se a função existir
        if (typeof setUser === 'function') {
          setUser(usuarioAtualizado);
        } else {
          // 2. Quebra-galho: Se o Contexto não tiver o setUser, atualiza direto no localStorage
          // (Geralmente o login guarda o usuário no localStorage com a chave 'user' ou 'usuario')
          localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
          localStorage.setItem('user', JSON.stringify(usuarioAtualizado));
        }

        alert("Perfil atualizado com sucesso!");
        
        // Redireciona para a página de Campanhas
        navigate('/campanhas');
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao salvar as alterações no servidor.");
    } finally {
      setCarregando(false);
    }
  };

  if (!user) return null;

  return (
    <Modal open={true}>
      <div className="container-configuracoes">
        
        {/* CABEÇALHO DO MODAL */}
        <div className="header-config">
          <div className="texto-header-config">
            <h1 className="titulo-principal-config">
              {nome.trim() !== '' ? nome : 'Nome do Usuário'}
            </h1>
            
            {/* ADICIONADO: @username reativo que atualiza em tempo real */}
            <p className="username-subtitulo-config">
              @{username.trim() !== '' ? username.toLowerCase() : 'usuario'}
            </p>

            <p className="subtitulo-config">sua conta pessoal</p>
          </div>
          
          {/* Input de arquivo invisível e restrito a imagens */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleArquivoSelecionado} 
            style={{ display: 'none' }} 
            accept="image/*"
          />

          {/* Avatar com evento de Clique para Upload */}
          <div className="avatar-editavel" onClick={handleGatilhoUpload} title="Mudar foto de perfil">
            <div className="avatar-imagem">
              {previewAvatar ? (
                <img src={previewAvatar} alt="Avatar do usuário" className="imagem-foto-perfil" />
              ) : (
                nome ? nome.charAt(0).toUpperCase() : 'U'
              )}
            </div>
            <div className="overlay-avatar">
              <span className="icone-lapis">✏️</span>
              <span className="legenda-editar">editar</span>
            </div>
          </div>
        </div>

        {/* Linha fina divisória */}
        <hr className="linha-divisoria-config" />

        {/* FORMULÁRIO */}
        <form onSubmit={handleSalvar} className="form-config">
          <h2 className="titulo-secao-config">Seu perfil</h2>
          
          <div className="campo-config">
            <label>Nome</label>
            <input 
              type="text" 
              className="input-padrao-login" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required
            />
          </div>

          <div className="campo-config">
            <label>Nome de Usuário</label>
            <input 
              type="text" 
              className="input-padrao-login" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className="campo-config">
            <label>Mini-bio</label>
            <textarea 
              className="input-padrao-login textarea-config" 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              rows="3"
            />
          </div>

          {/* BOTÕES */}
          <div className="botoes-config">
            <button 
              type="button" 
              onClick={handleFechar} 
              className="btn-voltar-login" 
              disabled={carregando}
            >
              Voltar
            </button>
            <button 
              type="submit" 
              className="btn-salvar-login" 
              disabled={carregando}
            >
              {carregando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}