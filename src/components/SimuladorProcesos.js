import React, { useState } from 'react';

export default function SimuladorProcesos() {
  // Guardamos el estado actual del proceso. Inicia "Apagado" (fuera de memoria).
  const [estado, setEstado] = useState('Apagado'); 

  // Esta función decide qué botones mostrar dependiendo del estado en el que estemos
  const renderBotones = () => {
    switch(estado) {
      case 'Apagado': 
        return <button onClick={() => setEstado('Nuevo')} style={btnStyle}>Abrir Programa (Crear)</button>;
      case 'Nuevo': 
        return <button onClick={() => setEstado('Listo')} style={btnStyle}>Admitir a RAM (Planificador)</button>;
      case 'Listo': 
        return <button onClick={() => setEstado('Ejecutando')} style={btnStyle}>Asignar CPU (Despachador)</button>;
      case 'Ejecutando': 
        return (
          <>
            <button onClick={() => setEstado('Listo')} style={btnStyle}>Se acabó su tiempo (Interrupción)</button>
            <button onClick={() => setEstado('Bloqueado')} style={btnStyle}>Pedir teclado/disco (Bloquear)</button>
            <button onClick={() => setEstado('Terminado')} style={btnStyle}>Cerrar programa (Terminar)</button>
          </>
        );
      case 'Bloqueado': 
        return <button onClick={() => setEstado('Listo')} style={btnStyle}>Dato recibido (Hardware)</button>;
      case 'Terminado': 
        return <button onClick={() => setEstado('Apagado')} style={btnStyle}>Limpiar Memoria</button>;
      default: return null;
    }
  };

  const btnStyle = { backgroundColor: '#ffffff', color: '#000000', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', margin: '5px' };

  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
      <h3 style={{ margin: '0 0 15px 0' }}>Estado del Proceso: <span style={{color: '#4af626', fontSize: '1.2em'}}>{estado}</span></h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {renderBotones()}
      </div>
    </div>
  );
}