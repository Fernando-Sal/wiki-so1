import React, { useState } from 'react';

export default function CalculadoraQuantum() {
  const [quantum, setQuantum] = useState(4);
  const [cambioContexto, setCambioContexto] = useState(1);

  // Calculamos el porcentaje de CPU desperdiciada
  const desperdicio = ((cambioContexto / (Number(quantum) + Number(cambioContexto))) * 100).toFixed(1);

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '20px', borderRadius: '8px', fontFamily: 'sans-serif', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
      <h3 style={{ color: '#4af626', margin: '0 0 15px 0' }}>Calculadora de Sobrecarga (Overhead)</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Tamaño del Quantum: <strong>{quantum} ms</strong></label>
        <input 
          type="range" min="1" max="20" value={quantum} 
          onChange={(e) => setQuantum(e.target.value)} 
          style={{ width: '80%' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Tiempo de Cambio de Contexto: <strong>{cambioContexto} ms</strong></label>
        <input 
          type="range" min="1" max="5" value={cambioContexto} 
          onChange={(e) => setCambioContexto(e.target.value)} 
          style={{ width: '80%' }}
        />
      </div>

      <div style={{ padding: '15px', backgroundColor: '#333', borderRadius: '5px', marginTop: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Desperdicio de CPU:</h4>
        <div style={{ fontSize: '2em', fontWeight: 'bold', color: desperdicio > 20 ? '#ff5555' : '#4af626' }}>
          {desperdicio}%
        </div>
        <p style={{ margin: '10px 0 0 0', fontSize: '0.9em' }}>
          {desperdicio > 20 ? '⚠️ Cuidado: Tu quantum es muy pequeño. El procesador pasa demasiado tiempo cambiando de programa.' : '✅ Buen balance. El procesador trabaja eficientemente.'}
        </p>
      </div>
    </div>
  );
}