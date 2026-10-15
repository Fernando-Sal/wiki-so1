import React, { useState } from 'react';

export default function SimuladorHilos() {
  // --- EL CEREBRO ---
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const simularHilos = () => {
    setEjecutando(true);
    setLineas([
      "$ gcc -pthread hilos.c -o hilos",
      "$ ./hilos",
      "🟡 [Memoria] Variable global compartida: Saldo = 100"
    ]);

    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 1] Depositando 50... Nuevo saldo: 150"]), 1000);
    setTimeout(() => setLineas(v => [...v, "🧵 [Hilo 2] Depositando 50... Nuevo saldo: 200"]), 2000);
    setTimeout(() => {
      setLineas(v => [...v, "✅ [Resultado] Los hilos comparten memoria. Saldo final = 200"]);
      setEjecutando(false);
    }, 3000);
  };

  const simularProcesos = () => {
    setEjecutando(true);
    setLineas([
      "$ gcc procesos.c -o procesos",
      "$ ./procesos",
      "🟡 [Memoria] Variable global: Saldo = 100"
    ]);

    setTimeout(() => setLineas(v => [...v, "✂️ [Sistema] fork() ejecutado. Se crea un clon exacto (Proceso Hijo)."]), 1000);
    setTimeout(() => setLineas(v => [...v, "📦 [Proceso Padre] Depositando 50 en mi copia... Mi saldo: 150"]), 2000);
    setTimeout(() => setLineas(v => [...v, "📦 [Proceso Hijo] Depositando 50 en mi copia... Mi saldo: 150"]), 3000);
    setTimeout(() => {
      setLineas(v => [...v, "❌ [Resultado] Los procesos están aislados. Nunca llegaron a 200."]);
      setEjecutando(false);
    }, 4500);
  };

  // --- LA CARA ---
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '2rem 0', backgroundColor: '#121212', fontFamily: '"Fira Code", monospace' }}>
      
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Hilos vs Procesos</span>
      </div>
      
      <div style={{ padding: '20px', color: '#bd93f9', minHeight: '180px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            className="button button--primary" 
            onClick={simularHilos} 
            disabled={ejecutando}
            style={{ fontWeight: 'bold', flex: 1 }}
          >
            ▶️ Simular Hilos (pthread)
          </button>
          <button 
            className="button button--secondary" 
            onClick={simularProcesos} 
            disabled={ejecutando}
            style={{ fontWeight: 'bold', flex: 1 }}
          >
            ▶️ Simular Procesos (fork)
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