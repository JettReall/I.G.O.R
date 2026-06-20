import Modal from "../../componentes/Modal";
import { useNavigate } from "react-router-dom";

export function ConfirmarCriar({ isAberto, set, texto, caminho }) {
  const navigate = useNavigate();

  const handleConfirmar = () => {
    navigate(caminho);
    set(false); // fecha o modal após navegar
  };

  const handleCancelar = () => {
    set(false);
  };

  return (
    <Modal open={isAberto}>
      <strong>{texto}</strong>
      <button onClick={handleCancelar}>Cancelar</button>
      <button onClick={handleConfirmar}>Confirmar</button>
    </Modal>
  );
}