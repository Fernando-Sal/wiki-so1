import React, { useState } from 'react';

export default function SimuladorProteccion() {
  // --- EL CEREBRO ---
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const arrancar = () => {
    setEjecutando(true);
    setLineas(["$ gcc rebelde.c -o rebelde", "$ ./rebelde"]);

    setTimeout(() => {
      setLineas(v => [...v, "Iniciando programa rebelde..."]);
    }, 800);

    setTimeout(() => {
      setLineas(v => [...v, "Intentando apagar el monitor directamente (Instrucción privilegiada)..."]);
    }, 1800); 

    setTimeout(() => {
      setLineas(v => [...v, <span style={{color: '#ff5555', fontWeight: 'bold'}}>Violación de segmento (`core` generado)</span>]);
      setLineas(v => [...v, "El Kernel ha destruido el proceso para proteger el sistema."]);
      setEjecutando(false);
    }, 2500);
  };

  // --- LA CARA ---
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', margin: '2rem 0', backgroundColor: '#121212', fontFamily: '"Fira Code", monospace' }}>
      
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Kernel vs Programa Rebelde</span>
      </div>
      
      <div style={{ padding: '20px', color: '#f8f8f2', minHeight: '160px' }}>
        <button 
          className="button button--danger" 
          onClick={arrancar} 
          disabled={ejecutando}
          style={{ marginBottom: '20px', fontWeight: 'bold', width: '100%' }}
        >
          {ejecutando ? '🛡️ El Kernel está vigilando...' : '▶️ Ejecutar programa rebelde'}
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