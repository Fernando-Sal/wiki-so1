import React, {useState} from 'react';
import styles from './styles.module.css';

// Tabla de páginas: el índice es el número de página y el valor, el marco.
// null significa "la página no está en memoria" (bit de validez en 0).
const TABLA_INICIAL = [5, 2, null, 7, 0, null, 3, 1];
const TAMANOS = [256, 512, 1024, 4096];

function traducir(texto, tamPagina, tabla) {
  const dir = Number(texto);
  const limite = tabla.length * tamPagina - 1;

  if (texto.trim() === '' || !Number.isInteger(dir) || dir < 0) {
    return {error: 'Escribe un entero mayor o igual a 0.'};
  }
  if (dir > limite) {
    return {error: `Fuera del espacio virtual (máximo ${limite}).`};
  }

  const pagina = Math.floor(dir / tamPagina);
  const desplazamiento = dir % tamPagina;
  const marco = tabla[pagina];

  if (marco === null) return {pagina, desplazamiento, fallo: true};
  return {pagina, desplazamiento, marco, fisica: marco * tamPagina + desplazamiento};
}

export default function AddressTranslator() {
  const [tamPagina, setTamPagina] = useState(1024);
  const [texto, setTexto] = useState('3500');
  const [tabla, setTabla] = useState(TABLA_INICIAL);

  const r = traducir(texto, tamPagina, tabla);
  const bitsDesplazamiento = Math.log2(tamPagina);

  const editarMarco = (pagina, valor) => {
    const nueva = [...tabla]; // copia: nunca mutar el estado directamente
    nueva[pagina] = valor === '' ? null : Number(valor);
    setTabla(nueva);
  };

  return (
    <div className={styles.contenedor}>
      {/* --- Barra de título macOS --- */}
      <div style={{ backgroundColor: '#2d2d2d', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', margin: '-1rem -1rem 1rem -1rem', borderBottom: '1px solid #444', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
        <span style={{ color: '#aaa', marginLeft: '10px', fontSize: '0.85rem', fontWeight: 'bold' }}>bash — Traductor de Direcciones MMU</span>
      </div>

      <div className={styles.controles}>
        <label>
          Tamaño de página:{' '}
          <select value={tamPagina} onChange={(e) => setTamPagina(Number(e.target.value))} style={{padding: '5px', borderRadius: '5px'}}>
            {TAMANOS.map((t) => <option key={t} value={t}>{t} bytes</option>)}
          </select>
        </label>
        <label>
          Dirección virtual:{' '}
          <input type="number" min="0" value={texto} onChange={(e) => setTexto(e.target.value)} style={{padding: '5px', borderRadius: '5px'}} />
        </label>
      </div>

      <p className={styles.ayuda}>
        Con páginas de {tamPagina} bytes, el desplazamiento usa {bitsDesplazamiento} bits.
        Deja un marco vacío para simular una página que no está en memoria.
      </p>

      <table className={styles.tabla}>
        <thead><tr><th>Página</th><th>Marco</th></tr></thead>
        <tbody>
          {tabla.map((marco, i) => (
            <tr key={i} className={r.pagina === i ? styles.activa : ''}>
              <td>{i}</td>
              <td>
                <input type="number" min="0" value={marco ?? ''} onChange={(e) => editarMarco(i, e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.resultado}>
        {r.error && <p className={styles.error}>{r.error}</p>}
        {!r.error && (
          <ol style={{margin: 0, paddingLeft: '20px'}}>
            <li>Página = &lfloor;{texto} / {tamPagina}&rfloor; = <strong>{r.pagina}</strong></li>
            <li>Desplazamiento = {texto} mod {tamPagina} = <strong>{r.desplazamiento}</strong></li>
            {r.fallo ? (
              <li className={styles.error}>
                La página {r.pagina} no está en memoria: <strong>fallo de página</strong>
              </li>
            ) : (
              <>
                <li>Marco (según la tabla) = <strong>{r.marco}</strong></li>
                <li>Física = {r.marco} &times; {tamPagina} + {r.desplazamiento} = <strong style={{color: '#50fa7b', fontSize: '1.2em'}}>{r.fisica}</strong></li>
              </>
            )}
          </ol>
        )}
      </div>
    </div>
  );
}