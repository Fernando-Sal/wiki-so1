import React, { useState } from 'react';

export default function SimuladorLotes() {
  // --- EL CEREBRO: La lógica se mantiene intacta ---
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const arrancar = () => {
    setEjecutando(true);
    setLineas(["$ ./simulador_lotes.sh", "--- Iniciando lote de trabajos ---"]);

    setTimeout(() => {
      setLineas(viejas => [...viejas, "[Trabajo 1] Analizando datos del sensor..."]);
    }, 1000);

    setTimeout(() => {
      setLineas(viejas => [...viejas, "[Trabajo 2] Generando reporte financiero..."]);
    }, 3000); 

    setTimeout(() => {
      setLineas(viejas => [...viejas, "--- Todos los trabajos finalizaron exitosamente ---"]);
      setEjecutando(false);
    }, 5000);
  };

  // --- LA CARA: El nuevo diseño gráfico ---
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '2rem 0', backgroundColor: '#121212', fontFamily: '"Fira Code", monospace' }}>
      
      {/* Barra superior de la ventana */}
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Procesamiento por Lotes</span>
      </div>
      
      {/* Área de la terminal interactiva */}
      <div style={{ padding: '20px', color: '#4af626', minHeight: '160px' }}>
        {/* Usamos las clases nativas de Docusaurus (button--success) para un botón moderno */}
        <button 
          className="button button--success" 
          onClick={arrancar} 
          disabled={ejecutando}
          style={{ marginBottom: '20px', fontWeight: 'bold', width: '100%' }}
        >
          {ejecutando ? '⏳ Procesando en segundo plano...' : '▶️ Arrancar Sistema de Lotes'}
        </button>
        
        <div>
          {lineas.map((texto, numero) => (
            <p key={numero} style={{ margin: '6px 0', textShadow: '0 0 5px rgba(74, 246, 38, 0.3)' }}>{texto}</p>
          ))}
        </div>
      </div>
      
    </div>
  );
}