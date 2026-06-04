// App.jsx
import React, { useEffect, useState } from 'react';

function App() {
  const usuarios = "";
  fetch("http://localhost:8080/api/usuarios") .then(response => console.log(response)) .catch(error => console.log(error))

}




export default App;