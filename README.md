# Simulador de Tiradas para el Sistema Genérico YSystem

Este proyecto es un simulador de tiradas diseñado específicamente para el sistema genérico **YSystem** desarrollado por [Walhalla Ediciones](https://walhallaediciones.gitlab.io/ysystem/). El simulador permite calcular y analizar múltiples tiradas de dados, bonificadores y dificultades de manera automatizada, facilitando el uso y comprensión de las mecánicas del sistema.

## Tabla de Contenidos
- [Características](#características)
- [Requisitos](#requisitos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Cómo Usarlo](#cómo-usarlo)
- [Personalización](#personalización)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Características

- **Simulación Rápida**: Ejecuta tiradas de dados con bonificadores y evalúa automáticamente los éxitos, fracasos, críticos y pifias.
- **Resultados Detallados**: Presenta los resultados de las simulaciones en una tabla interactiva gracias a [DataTables](https://datatables.net/).
- **Modos Oscuro y Claro**: Personaliza la interfaz para adaptarla a tus preferencias visuales.
- **Responsive Design**: Interfaz totalmente adaptable para su uso en dispositivos móviles, tabletas y ordenadores de escritorio.

---

## Requisitos

Para usar este proyecto no se necesita instalación adicional, solo un navegador moderno. Sin embargo, las siguientes dependencias están incluidas y se cargan desde CDNs:
- [jQuery](https://jquery.com/)
- [DataTables](https://datatables.net/)
- [Font Awesome](https://fontawesome.com/)

---

## Estructura del Proyecto

```plaintext
/
├── index.html        # Página principal del simulador
├── README.md         # Este archivo
├── /assets           # (Opcional) Carpeta para almacenar imágenes o recursos personalizados
```

---

## Cómo Usarlo

1. [**Abrir el Simulador**] (https://dpa3001.github.io/ysystem-simulator/){:target="_blank"}


2. **Configurar las Tiradas**:
   - Selecciona:
     - Número de dados de **Habilidad PJ1** (1, 2 o 3).
     - **Bonificador PJ1** correspondiente al atributo relacionado con la habilidad del personaje (0, +1, +2, +4 o +6).
     - **Dificultad** del enfrentamiento (entre 5 y 25).

3. **Resultados**:
   - **Tabla**: Visualiza los resultados de cada tirada en una tabla interactiva (incluye tiradas de dados, bonificadores, dificultad y el resultado final).
   - **Resumen**: Consulta los datos acumulativos de las simulaciones (éxitos, fracasos, críticos y pifias).

---

## Contribuciones

¡Tu participación es bienvenida! Si deseas colaborar en el desarrollo del simulador de tiradas para el sistema genérico **YSystem**, sigue estos pasos:

1. Haz un **fork** del repositorio para crear una copia en tu cuenta.
2. Crea una nueva rama en tu repositorio local para los cambios que deseas realizar:
   ```bash
   git checkout -b nombre-de-tu-rama
3. Realiza las modificaciones o añade nuevas funcionalidades.
4. Prueba tus cambios para asegurarte de que no afecten negativamente al simulador.
5. Haz un commit de tus cambios con un mensaje claro y conciso:
   ```bash
   git commit -m "Descripción breve de los cambios"
6. Envía tus cambios a tu repositorio remoto:
   ```bash
   git push origin nombre-de-tu-rama
7. Abre un Pull Request en el repositorio original, explicando los cambios realizados y el propósito de los mismos.

### Recomendaciones

- Mantén la estructura base del proyecto: No elimines funcionalidades o estilos existentes sin una justificación clara.
- Sigue las normas de estilo del proyecto para mantener la consistencia del código.
- Acompaña tus cambios con documentación adicional si introduces nuevas características.

### Sugerencias e Ideas
Si tienes ideas para mejorar el simulador o encuentras errores, abre un issue en el repositorio. Describe detalladamente el problema o la propuesta para que pueda ser discutida y evaluada.

Tu colaboración ayudará a mejorar esta herramienta y a expandir las posibilidades del sistema YSystem.

### Detalles Incluidos:
1. **Pasos claros** para realizar contribuciones técnicas, como forks, ramas y commits.
2. **Recomendaciones** para mantener la estructura base del proyecto.
3. Una sección para fomentar la participación mediante **issues** para errores o nuevas ideas.

Si necesitas algún ajuste o complemento, házmelo saber. 😊

---

## Licencia

Este proyecto es una herramienta complementaria diseñada para facilitar el uso del sistema genérico **YSystem**, desarrollado por Daniel Palacios Alonso. El simulador se ofrece de manera gratuita para fines educativos y recreativos, respetando los derechos de propiedad intelectual del sistema **Creative Commons BY-NC-ND 4.0**.

### Condiciones de Uso
- **Fines permitidos**: Puedes utilizar el simulador para actividades relacionadas con la enseñanza, aprendizaje o recreación.
- **Prohibiciones**: No se permite el uso del simulador con fines comerciales o de lucro sin previa autorización.

### Atribución
Si utilizas este simulador o partes de su código en tus proyectos, es importante incluir una mención a **Daniel Palacios Alonso** y un enlace al sistema oficial [YSystem](https://walhallaediciones.gitlab.io/ysystem/).

### Propiedad Intelectual
Las mecánicas, conceptos y elementos del sistema **YSystem** son propiedad intelectual de **Walhalla Ediciones**. Este simulador no sustituye ni reemplaza la documentación oficial ni los productos ofrecidos por la editorial.

Para más detalles sobre los términos de uso de **YSystem**, consulta su [documentación oficial](https://walhallaediciones.gitlab.io/ysystem/).
