import React, { useState } from 'react';

export default function SimuladorCarrera() {
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const simularError = () => {
    setEjecutando(true);
    setLineas([
      "$ gcc -pthread carrera.c -o carrera",
      "Ejecutando 5 veces SIN protección..."
    ]);

    // Simulamos los resultados reales y caóticos de una condición de carrera
    setTimeout(() => setLineas(v => [...v, "> Intento 1: Esperado: 2000000, obtenido: 1145392 ❌"]), 1000);
    setTimeout(() => setLineas(v => [...v, "> Intento 2: Esperado: 2000000, obtenido: 1089104 ❌"]), 1800);
    setTimeout(() => setLineas(v => [...v, "> Intento 3: Esperado: 2000000, obtenido: 1532091 ❌"]), 2600);
    setTimeout(() => setLineas(v => [...v, "> Intento 4: Esperado: 2000000, obtenido: 1999823 ❌"]), 3400);
    setTimeout(() => {
      setLineas(v => [...v, "> Intento 5: Esperado: 2000000, obtenido: 1045999 ❌"]);
      setLineas(v => [...v, "⚠️ [Alerta] Los hilos se están pisando entre sí. Se pierden sumas."]);
      setEjecutando(false);
    }, 4200);
  };

  const simularMutex = () => {
    setEjecutando(true);
    setLineas([
      "$ gcc -pthread carrera_mutex.c -o carrera_mutex",
      "Ejecutando 5 veces CON protección Mutex..."
    ]);

    setTimeout(() => setLineas(v => [...v, "> Intento 1: Esperado: 2000000, obtenido: 2000000 ✅"]), 1000);
    setTimeout(() => setLineas(v => [...v, "> Intento 2: Esperado: 2000000, obtenido: 2000000 ✅"]), 1800);
    setTimeout(() => setLineas(v => [...v, "> Intento 3: Esperado: 2000000, obtenido: 2000000 ✅"]), 2600);
    setTimeout(() => setLineas(v => [...v, "> Intento 4: Esperado: 2000000, obtenido: 2000000 ✅"]), 3400);
    setTimeout(() => {
      setLineas(v => [...v, "> Intento 5: Esperado: 2000000, obtenido: 2000000 ✅"]);
      setLineas(v => [...v, "🔒 [Éxito] Exclusión mutua garantizada. Ninguna suma se perdió."]);
      setEjecutando(false);
    }, 4200);
  };

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '2rem 0', backgroundColor: '#121212', fontFamily: '"Fira Code", monospace' }}>
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Experimento Condición de Carrera</span>
      </div>
      
      <div style={{ padding: '20px', color: '#f1fa8c', minHeight: '260px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button className="button button--danger" onClick={simularError} disabled={ejecutando} style={{ fontWeight: 'bold', flex: 1, color: 'white' }}>
            ▶️ Simular SIN protección
          </button>
          <button className="button button--success" onClick={simularMutex} disabled={ejecutando} style={{ fontWeight: 'bold', flex: 1 }}>
            ▶️ Simular CON Mutex
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