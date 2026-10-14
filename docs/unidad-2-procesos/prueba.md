```markdown
   ---
   sidebar_position: 1
   ---

   # Prueba de Mermaid

   ```mermaid
   stateDiagram-v2
       [*] --> Nuevo
       Nuevo --> Listo
       Listo --> Ejecutando
       Ejecutando --> Listo: quantum agotado
       Ejecutando --> Bloqueado: E/S
       Bloqueado --> Listo
       Ejecutando --> [*]