import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';

const TRANSICIONES = {
  Nuevo: [{a: 'Listo', motivo: 'El SO admite el proceso'}],
  Listo: [{a: 'Ejecutando', motivo: 'El despachador le asigna la CPU'}],
  Ejecutando: [
    {a: 'Listo', motivo: 'Se agotó el quantum (expropiación)'},
    {a: 'Bloqueado', motivo: 'Pide E/S o espera un evento'},
    {a: 'Terminado', motivo: 'Finaliza su ejecución'},
  ],
  Bloqueado: [{a: 'Listo', motivo: 'La E/S o el evento terminó'}],
  Terminado: [],
};

export default function ProcessSimulator() {
  const [estado, setEstado] = useState('Nuevo');
  const [historial, setHistorial] = useState(['Nuevo']);
  
  // -- Inicio de las Mejoras del Profesor --
  const [cambiosContexto, setCambiosContexto] = useState(0);
  const [programCounter, setProgramCounter] = useState(0);

  // Efecto para simular que el Contador de Programa aumenta cuando está Ejecutando
  useEffect(() => {
    let intervalo;
    if (estado === 'Ejecutando') {
      intervalo = setInterval(() => {
        setProgramCounter(pc => pc + 1);
      }, 600); // Sube 1 cada medio segundo
    }
    return () => clearInterval(intervalo);
  }, [estado]);
  // -- Fin de las Mejoras --

  const mover = (transicion) => {
    // Si salimos del estado Ejecutando a cualquier otro, contamos 1 cambio de contexto
    if (estado === 'Ejecutando' && transicion.a !== 'Ejecutando') {
      setCambiosContexto(c => c + 1);
    }
    
    setEstado(transicion.a);
    setHistorial([...historial, transicion.a]);
  };

  const reiniciar = () => {
    setEstado('Nuevo');
    setHistorial(['Nuevo']);
    setCambiosContexto(0);
    setProgramCounter(0);
  };

  return (
    <div className={styles.contenedor}>
      
      {/* Panel del PCB (Mejora #2 y #1 implementada) */}
      <div style={{ backgroundColor: 'var(--ifm-color-emphasis-100)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>💾 Bloque de Control de Proceso (PCB)</h4>
        <p style={{ margin: '2px 0' }}><strong>PID:</strong> 1045</p>
        <p style={{ margin: '2px 0' }}><strong>Estado:</strong> <span className={styles.estado}>{estado}</span></p>
        <p style={{ margin: '2px 0' }}><strong>Program Counter:</strong> {programCounter} <em>{estado === 'Ejecutando' ? '(Avanzando...)' : '(Pausado)'}</em></p>
        <p style={{ margin: '2px 0' }}><strong>Cambios de Contexto:</strong> {cambiosContexto}</p>
      </div>

      <p>Estado actual: <strong className={styles.estado}>{estado}</strong></p>

      <div className={styles.botones}>
        {TRANSICIONES[estado].map((t) => (
          <button key={t.a + t.motivo} className="button button--primary" onClick={() => mover(t)}>
            {t.a}: {t.motivo}
          </button>
        ))}
        {TRANSICIONES[estado].length === 0 && (
          <p>El proceso terminó. No hay más transiciones posibles.</p>
        )}
      </div>

      <p>Recorrido: {historial.join(' → ')}</p>
      <button className="button button--secondary button--sm" onClick={reiniciar}>
        Reiniciar
      </button>
    </div>
  );
}
