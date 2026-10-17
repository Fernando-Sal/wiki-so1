import React, {useState} from 'react';
import styles from './styles.module.css';

const N_PROCESOS = 5;

// Estado inicial: valor del semáforo, 5 procesos, cola vacía y bitácora.
function crearInicial(valor) {
  return {
    valor,
    procesos: Array.from({length: N_PROCESOS}, (_, i) => ({id: i + 1, estado: 'Fuera'})),
    cola: [],
    log: [`Semáforo inicializado en ${valor}`],
  };
}

// Función PURA: recibe el estado anterior y devuelve el nuevo, sin modificarlo.
function accion(s, id) {
  const proc = s.procesos.find((p) => p.id === id);
  if (proc.estado === 'Bloqueado') return s; // un proceso bloqueado no puede actuar

  const procesos = s.procesos.map((p) => ({...p}));
  const actual = procesos.find((p) => p.id === id);
  const cola = [...s.cola];
  const log = [...s.log];
  let valor = s.valor;

  if (actual.estado === 'Fuera') {
    valor -= 1; // wait()
    if (valor < 0) {
      actual.estado = 'Bloqueado';
      cola.push(id);
      log.push(`P${id}: wait() -> valor ${valor}, se bloquea`);
    } else {
      actual.estado = 'Dentro';
      log.push(`P${id}: wait() -> valor ${valor}, entra`);
    }
  } else {
    valor += 1; // signal()
    actual.estado = 'Fuera';
    log.push(`P${id}: signal() -> valor ${valor}`);
    if (valor <= 0) {
      const despierta = cola.shift(); // FIFO: sale el que esperó más
      procesos.find((p) => p.id === despierta).estado = 'Dentro';
      log.push(`P${despierta} despierta y entra`);
    }
  }
  return {valor, procesos, cola, log: log.slice(-6)};
}

export default function SemaphoreSimulator() {
  const [inicial, setInicial] = useState(3);
  const [s, setS] = useState(crearInicial(3));

  const cambiarInicial = (e) => {
    const v = Number(e.target.value);
    setInicial(v);
    setS(crearInicial(v)); // reiniciar al cambiar el valor inicial
  };

  return (
    <div className={styles.contenedor}>
      {/* --- INICIO DE LA ESTÉTICA DE TERMINAL --- */}
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', margin: '-1rem -1rem 1rem -1rem', borderBottom: '1px solid #444', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Sprint 2: Semáforo Animado</span>
      </div>
      {/* --- FIN DE LA ESTÉTICA --- */}

      <label>
        Valor inicial:{' '}
        <select value={inicial} onChange={cambiarInicial} style={{ padding: '4px', borderRadius: '4px', background: '#333', color: '#fff', border: '1px solid #555' }}>
          {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>

      <p style={{ marginTop: '15px' }}>
        Valor del semáforo:{' '}
        <strong className={s.valor < 0 ? styles.negativo : styles.valor}>{s.valor}</strong>{' '}
        {s.valor < 0 && <span style={{color: '#ff5555'}}>({-s.valor} proceso(s) esperando)</span>}
      </p>

      <p className={styles.ayuda}>Haz clic en un proceso para que ejecute su siguiente acción (wait/signal).</p>

      <div className={styles.procesos}>
        {s.procesos.map((p) => (
          <button
            key={p.id}
            className={`${styles.proceso} ${styles[p.estado]}`}
            onClick={() => setS(accion(s, p.id))}
            disabled={p.estado === 'Bloqueado'}
          >
            <strong>P{p.id}</strong>
            <span>{p.estado}</span>
          </button>
        ))}
      </div>

      <p style={{ marginTop: '15px' }}>Cola de bloqueados: <strong>{s.cola.length ? s.cola.map((i) => `P${i}`).join(' → ') : 'Vacía'}</strong></p>

      <ul className={styles.log}>
        {s.log.map((linea, i) => <li key={i}>{linea}</li>)}
      </ul>

      <button className="button button--secondary button--sm" onClick={() => setS(crearInicial(inicial))} style={{ marginTop: '10px' }}>
        Reiniciar
      </button>
    </div>
  );
}