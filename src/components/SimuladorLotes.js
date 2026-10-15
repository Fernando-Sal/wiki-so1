import React, { useState } from 'react';
export default function SimuladorLotes() {
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

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#4af626', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', marginTop: '20px', marginBottom: '20px' }}>
      <button 
        onClick={arrancar} 
        disabled={ejecutando}
        style={{ backgroundColor: '#ffffff', color: '#000000', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
      >
        {ejecutando ? '⏳ Procesando lote...' : '▶️ Ejecutar simulación en vivo'}
      </button>
      <div style={{ minHeight: '120px' }}>
        {lineas.map((texto, numero) => (
          <p key={numero} style={{ margin: '5px 0' }}>{texto}</p>
        ))}
      </div>
    </div>
  );
}
