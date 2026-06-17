import React from 'react';
import ReactDOM from 'react-dom'; // ← importação necessária

const EstiloModal = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  padding: '50px',
  zIndex: 1000
}

const EstiloOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, open }) {
  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <div style={EstiloOverlay} />
      <div style={EstiloModal}>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}