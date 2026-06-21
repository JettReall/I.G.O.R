import { Children } from "react";
import Modal from "../../componentes/Modal";

    const stilo = {
      placeSelf: "center",
      justifySelf: 'center',
    }

export default function Carregando({aberto}) {
     return (
          <Modal open={aberto}>
               <h1 style={stilo}>Carregando...</h1>
          </Modal>
     )
}