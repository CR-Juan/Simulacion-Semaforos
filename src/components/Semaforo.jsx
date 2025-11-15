import { useState, useEffect } from 'react';
import './Semaforo.css';

function Semaforo({ direccion }) {
  const [colorActual, setColorActual] = useState('red');

  // Escuchar eventos del controlador central
  useEffect(() => {
    const manejarCambioFase = (evento) => {
      const { fase } = evento.detail;
      
      // Cada semáforo decide su color según la fase y su dirección
      switch(fase) {
        case 0: // Este y Oeste en verde
          if (direccion === 'este' || direccion === 'oeste') {
            setColorActual('green');
          } else {
            setColorActual('red');
          }
          break;
          
        case 1: // Sur en verde
          if (direccion === 'sur') {
            setColorActual('green');
          } else {
            setColorActual('red');
          }
          break;
          
        case 2: // Norte en verde
          if (direccion === 'norte') {
            setColorActual('green');
          } else {
            setColorActual('red');
          }
          break;
          
        default:
          setColorActual('red');
      }
    };

    window.addEventListener('cambioFase', manejarCambioFase);

    return () => {
      window.removeEventListener('cambioFase', manejarCambioFase);
    };
  }, [direccion]);

  return (
    <div className={`semaforo semaforo-${direccion}`}>
      <h3>{direccion.toUpperCase()}</h3>
      <div className="luces">
        <div className={`luz roja ${colorActual === 'red' ? 'activa' : ''}`}></div>
        <div className={`luz amarilla ${colorActual === 'yellow' ? 'activa' : ''}`}></div>
        <div className={`luz verde ${colorActual === 'green' ? 'activa' : ''}`}></div>
      </div>
    </div>
  );
}

export default Semaforo;