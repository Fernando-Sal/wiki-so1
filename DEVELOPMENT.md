# Bitácora Técnica

## 1. Stack tecnológico

| Componente | Herramienta | Por qué se eligió |
|---|---|---|
| Generador del sitio | Docusaurus 3 | (tu justificación) |
| Contenido | Markdown / MDX | (tu justificación) |
| Diagramas | Mermaid | (tu justificación) |
| Buscador | docusaurus-search-local | (tu justificación) |
| Hosting | GitHub Pages | (tu justificación) |
| CI/CD | GitHub Actions | (tu justificación) |

## 2. Manual de uso local

Requisitos: Node.js >= 20 y Git.

```bash
git clone git@github.com:Fernando-Sal/wiki-so1.git
cd wiki-so1
npm ci
npm start        # servidor de desarrollo en localhost:3000
npm run build    # compila a /build
npm run serve    # prueba la versión compilada
```

## 3. Estructura del proyecto

(Aquí pegas la salida de `tree -L 2 -I node_modules` y explicas cada carpeta.)

## 4. Arquitectura del pipeline

(Aquí va el diagrama Mermaid del flujo y una explicación de los dos jobs.)

## 5. Bitácora de decisiones

| Fecha | Decisión | Motivo |
|---|---|---|
| 13/10/2026 | Se eligió Docusaurus sobre MkDocs | Widgets interactivos con React/MDX |