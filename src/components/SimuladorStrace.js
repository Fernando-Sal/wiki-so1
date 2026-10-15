import React, { useState } from 'react';

export default function SimuladorStrace() {
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const arrancar = () => {
    setEjecutando(true);
    setLineas(["$ gcc ejemplo.c -o ejemplo", "$ strace ./ejemplo"]);

    // Simulamos la cascada rápida de llamadas al sistema previas que hace Linux
    setTimeout(() => setLineas(v => [...v, "execve(\"./ejemplo\", [\"./ejemplo\"], 0x7ffd5e... /* 53 vars */) = 0"]), 600);
    setTimeout(() => setLineas(v => [...v, "brk(NULL)                               = 0x55b4e7e9a000"]), 900);
    setTimeout(() => setLineas(v => [...v, "mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7fb34b6b6000"]), 1200);
    
    // Aquí está la llamada estrella de nuestro código: el write
    setTimeout(() => setLineas(v => [...v, "write(1, \"Hola desde write()\\n\", 19Hola desde write()", ") = 19"]), 2000);
    
    // Finalización del programa
    setTimeout(() => {
      setLineas(v => [...v, "exit_group(0)                           = ?"]);
      setLineas(v => [...v, "+++ exited with 0 +++"]);
      setEjecutando(false);
    }, 2500);
  };

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#4af626', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', marginTop: '20px', marginBottom: '20px' }}>
      <button 
        onClick={arrancar} 
        disabled={ejecutando}
        style={{ backgroundColor: '#ffffff', color: '#000000', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
      >
        {ejecutando ? '🔍 Analizando con strace...' : '▶️ Ejecutar Experimento strace'}
      </button>
      <div style={{ minHeight: '180px' }}>
        {lineas.map((texto, numero) => (
          <p key={numero} style={{ margin: '3px 0', wordBreak: 'break-all' }}>{texto}</p>
        ))}
      </div>
    </div>
  );
}