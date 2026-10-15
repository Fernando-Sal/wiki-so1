import React, { useState } from 'react';

export default function SimuladorPCB() {
  // --- EL CEREBRO ---
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const arrancar = () => {
    setEjecutando(true);
    setLineas([
      "💻 [CPU] Ejecutando: Proceso A (Navegador Web)",
      "------------------------------------------------"
    ]);

    setTimeout(() => setLineas(v => [...v, "⚠️ [Hardware] Interrupción: Fin de tiempo para Proceso A"]), 1500);
    setTimeout(() => setLineas(v => [...v, "💾 [Sistema Operativo] Guardando estado en PCB_A... (Línea actual, registros)"]), 3000); 
    setTimeout(() => setLineas(v => [...v, "📂 [Sistema Operativo] Buscando proceso Listo en la fila... Encontrado: Proceso B (Música)"]), 4500);
    setTimeout(() => setLineas(v => [...v, "🔋 [Sistema Operativo] Cargando estado desde PCB_B... (Restaurando registros)"]), 6000);

    setTimeout(() => {
      setLineas(v => [...v, "------------------------------------------------"]);
      setLineas(v => [...v, "💻 [CPU] Ejecutando: Proceso B (Música)"]);
      setEjecutando(false);
    }, 7500);
  };

  // --- LA CARA ---
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '2rem 0', backgroundColor: '#121212', fontFamily: '"Fira Code", monospace' }}>
      
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Cambio de Contexto</span>
      </div>
      
      <div style={{ padding: '20px', color: '#ffb86c', minHeight: '200px' }}>
        <button 
          className="button button--warning" 
          onClick={arrancar} 
          disabled={ejecutando}
          style={{ marginBottom: '20px', fontWeight: 'bold', width: '100%', color: '#000' }}
        >
          {ejecutando ? '🔄 Cambiando contexto...' : '▶️ Simular Cambio de Contexto'}
        </button>
        
        <div>
          {lineas.map((texto, numero) => (
            <p key={numero} style={{ margin: '5px 0' }}>{texto}</p>
          ))}
        </div>
      </div>
    </div>
  );
}