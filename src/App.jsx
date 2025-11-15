import { useState, useEffect } from 'react';
import Semaforo from './components/Semaforo';
import './App.css';

function App() {
  const [tiempoCiclo, setTiempoCiclo] = useState(3000);
  const [faseActual, setFaseActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFaseActual((fasePrevia) => (fasePrevia + 1) % 3);
      
      const evento = new CustomEvent('cambioFase', { 
        detail: { fase: (faseActual + 1) % 3 } 
      });
      window.dispatchEvent(evento);
    }, tiempoCiclo);

    return () => clearInterval(intervalo);
  }, [tiempoCiclo, faseActual]);

  return (
    <div className="App">
      <div className="interseccion">
        <div className="carretera-vertical">
          <div className="linea-central-vertical"></div>
        </div>
        <div className="carretera-horizontal">
          <div className="linea-central-horizontal"></div>
        </div>
        
        <Semaforo direccion="norte" />
        <Semaforo direccion="sur" />
        <Semaforo direccion="este" />
        <Semaforo direccion="oeste" />
      </div>
    </div>
  );
}

export default App;