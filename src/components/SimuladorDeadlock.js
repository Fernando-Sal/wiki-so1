import React, { useState } from 'react';

export default function SimuladorDeadlock() {
  const [lineas, setLineas] = useState(["$ ./programa_c", "Iniciando hilos..."]);
  const [ejecutando, setEjecutando] = useState(false);

  const simularDeadlock = () => {
    setEjecutando(true);
    setLineas(["$ gcc deadlock.c -o deadlock -pthread", "$ ./deadlock", "Iniciando simulación CON interbloqueo..."]);

    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 1] Adquiere Mutex A... (Éxito)"]), 800);
    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 2] Adquiere Mutex B... (Éxito)"]), 1600);
    setTimeout(() => setLineas(v => [...v, "⏳ [Hilo 1] Intenta adquirir Mutex B... (Esperando a Hilo 2)"]), 2600);
    setTimeout(() => setLineas(v => [...v, "⏳ [Hilo 2] Intenta adquirir Mutex A... (Esperando a Hilo 1)"]), 3600);
    
    setTimeout(() => {
      setLineas(v => [...v, "❄️ [SISTEMA CONGELADO] Deadlock detectado. Presiona Ctrl+C para abortar."]);
      setEjecutando(false);
    }, 4600);
  };

  const simularSolucion = () => {
    setEjecutando(true);
    setLineas(["$ gcc sin_deadlock.c -o sin_deadlock -pthread", "$ ./sin_deadlock", "Iniciando simulación SIN interbloqueo (Orden fijo)..."]);

    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 1] Adquiere Mutex A... (Éxito)"]), 800);
    setTimeout(() => setLineas(v => [...v, "⏳ [Hilo 2] Intenta adquirir Mutex A... (Ocupado, espera turno)"]), 1600);
    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 1] Adquiere Mutex B... (Éxito)"]), 2400);
    setTimeout(() => setLineas(v => [...v, "✅ [Hilo 1] Termina su trabajo. Libera Mutex B y A."]), 3200);
    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 2] Adquiere Mutex A... (Éxito)"]), 4000);
    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 2] Adquiere Mutex B... (Éxito)"]), 4800);
    
    setTimeout(() => {
      setLineas(v => [...v, "✅ [Hilo 2] Termina su trabajo. Libera Mutex B y A."]);
      setLineas(v => [...v, "🎉 Ejecución completada exitosamente."]);
      setEjecutando(false);
    }, 5600);
  };

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '2rem 0', backgroundColor: '#121212', fontFamily: '"Fira Code", monospace' }}>
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Simulador de Deadlock</span>
      </div>
      
      <div style={{ padding: '20px', color: '#ffb86c', minHeight: '260px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button className="button button--danger" onClick={simularDeadlock} disabled={ejecutando} style={{ fontWeight: 'bold', flex: 1, color: 'white' }}>
            ▶️ Ejecutar con Deadlock
          </button>
          <button className="button button--success" onClick={simularSolucion} disabled={ejecutando} style={{ fontWeight: 'bold', flex: 1 }}>
            ▶️ Ejecutar Solución
          </button>
        </div>
        
        <div>
          {lineas.map((texto, numero) => (
            <p key={numero} style={{ margin: '5px 0' }}>{texto}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
