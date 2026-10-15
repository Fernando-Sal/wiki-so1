import React, { useState } from 'react';

export default function SimuladorStrace() {
  // --- EL CEREBRO ---
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const arrancar = () => {
    setEjecutando(true);
    setLineas(["$ gcc ejemplo.c -o ejemplo", "$ strace ./ejemplo"]);

    setTimeout(() => setLineas(v => [...v, "execve(\"./ejemplo\", [\"./ejemplo\"], 0x7ffd5e... /* 53 vars */) = 0"]), 600);
    setTimeout(() => setLineas(v => [...v, "brk(NULL)                               = 0x55b4e7e9a000"]), 900);
    setTimeout(() => setLineas(v => [...v, "mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7fb34b6b6000"]), 1200);
    setTimeout(() => setLineas(v => [...v, "write(1, \"Hola desde write()\\n\", 19Hola desde write()", ") = 19"]), 2000);
    
    setTimeout(() => {
      setLineas(v => [...v, "exit_group(0)                           = ?"]);
      setLineas(v => [...v, "+++ exited with 0 +++"]);
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
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Interceptando Llamadas al Sistema</span>
      </div>
      
      <div style={{ padding: '20px', color: '#00d8ff', minHeight: '220px' }}>
        <button 
          className="button button--info" 
          onClick={arrancar} 
          disabled={ejecutando}
          style={{ marginBottom: '20px', fontWeight: 'bold', width: '100%' }}
        >
          {ejecutando ? '🔍 Analizando memoria y kernel...' : '▶️ Ejecutar Experimento strace'}
        </button>
        
        <div>
          {lineas.map((texto, numero) => (
            <p key={numero} style={{ margin: '4px 0', wordBreak: 'break-all', opacity: 0.9 }}>{texto}</p>
          ))}
        </div>
      </div>
      
    </div>
  );
}