# Simulador de Enfrentamientos para YSystem (Versión 2)

Bienvenido al repositorio del **Simulador de Enfrentamientos para YSystem (V2)**, una herramienta interactiva diseñada para facilitar el análisis y la comprensión de las mecánicas del sistema genérico **YSystem** desarrollado por [Walhalla Ediciones](https://walhallaediciones.gitlab.io/ysystem/).

## Tabla de Contenidos
- [Simulador de Enfrentamientos para YSystem (Versión 2)](#simulador-de-enfrentamientos-para-ysystem-versión-2)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Introducción](#introducción)
  - [Características](#características)
  - [Nuevas Visualizaciones](#nuevas-visualizaciones)
  - [Requisitos y Dependencias](#requisitos-y-dependencias)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Cómo Usar el Simulador](#cómo-usar-el-simulador)
  - [Personalización](#personalización)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)

---

## Introducción

El Simulador de Enfrentamientos para YSystem (V2) es una aplicación web moderna e interactiva que permite simular tiradas de dados ajustadas a las mecánicas del sistema genérico **YSystem**. En esta versión se han agregado funcionalidades nuevas tales como Recuerdo Cuando... y el bonificador de (+3) por profesión, así como gráficos dinámicos con **D3.js** para visualizar de forma clara y detallada la distribución de resultados y la evolución de las simulaciones.

El Simulador de Enfrentamientos para **YSystem** (V2) es una aplicación web moderna e interactiva diseñada para simular tiradas de dados según las mecánicas del sistema genérico YSystem. En esta versión se han incorporado funcionalidades novedosas, como la mecánica **Recuerdo Cuando...** y un bono adicional de (+3) por **profesión**, además de gráficos dinámicos con **D3.js** que permiten visualizar de forma clara y detallada tanto la distribución de resultados como la evolución de las simulaciones.

---

## Características

- **Simulación Avanzada:** Ejecuta múltiples simulaciones que incorporan tiradas de dados, bonificadores, dificultades y mecánicas especiales como "Recuerdo cuando...".
- **Interfaz Dinámica:** Incluye modo claro/oscuro, toggles interactivos para activar mecánicas opcionales (Recuerdo cuando... y bono "+3 de Profesión") y una tabla interactiva basada en DataTables.
- **Visualizaciones con D3.js:** La herramienta genera gráficos dinámicos que representan los valores más importantes de las simulaciones.
- **Diseño Responsive y Modular:** Optimizado para dispositivos móviles, tabletas y escritorios, con una estructura modular que facilita la personalización y extensión del simulador.

---

## Nuevas Visualizaciones

La versión 2 incorpora una serie de gráficos creados con **D3.js** para ofrecer un análisis detallado de las simulaciones:

- **Gráfico de Pastel:** Muestra la distribución de los resultados finales en porcentajes.
- **Histograma:** Visualiza la frecuencia de la suma total de los dados (resultadoPJ) de manera discreta, con las barras centradas en cada número.
- **Gráfico de Barras Horizontal:** Representa la frecuencia absoluta de cada categoría de resultado (Éxito, Fallo, Crítico, Pifia).
- **Gráfico de Línea:** Ilustra el promedio acumulado de éxitos (%) conforme se ejecutan las simulaciones, permitiendo ver cómo se estabiliza la tasa de éxito.
- **Gráfico de Dispersión:** Cada punto corresponde a una simulación, con el eje X mostrando el número (índice) de la simulación y el eje Y la suma total obtenida, lo que te permite visualizar la dispersión y el comportamiento de cada lanzamiento.

Cada gráfico se genera de forma dinámica y se actualiza tras cada simulación, permitiendo una experiencia interactiva y visualmente coherente con el estilo del proyecto.

---

## Requisitos y Dependencias

El simulador se ejecuta en cualquier navegador moderno y utiliza las siguientes dependencias, que se cargan desde CDNs:

- [jQuery](https://jquery.com/)
- [DataTables](https://datatables.net/)
- [D3.js](https://d3js.org/)
- [Font Awesome](https://fontawesome.com/)

No se requiere instalación adicional, solo clonar el repositorio y abrir `index.html` en tu navegador.

---

## Estructura del Proyecto

```plaintext
/
├── index.html        # Página principal del simulador
├── styles.css        # Estilos del simulador y gráficos
├── scripts.js        # Lógica de simulación y generación de gráficos con D3.js
├── README.md         # Este archivo
└── assets/           # (Opcional) Imágenes y otros recursos
```

## Cómo Usar el Simulador
1. Abre el simulador en tu navegador (por ejemplo, vía GitHub Pages). 
2. Configura los parámetros: 
   - Selecciona el número de dados de **Habilidad PJ** (1, 2 o 3). 
   - Escoge el **Bonificador PJ** (0, +1, +2, +4 o +6). 
   - Define la **Dificultad** del enfrentamiento (valor entre 5 y 25). 
   - Establece el número de simulaciones a ejecutar.
3. Activa o desactiva las mecánicas opcionales:
- **Recuerdo cuando...** (suma 2 dados extra).
- **+3 de Profesión** (agrega un bono adicional al bonificador base).
4. Ejecuta la simulación haciendo clic en "Simular Enfrentamientos". Los resultados se muestran en una tabla interactiva y en múltiples gráficos. 
5. Utiliza el toggle "Mostrar/Ocultar Tabla" para visualizar u ocultar la tabla de resultados y consulta los gráficos para analizar la distribución, tendencias y dispersión de los resultados.

## Personalización
- **Temas:** Cambia entre modo claro y modo oscuro con el botón "Modo Claro"/"Modo Oscuro".
- **Gráficos:** Los gráficos dinámicos se generan utilizando D3.js. Si deseas personalizarlos, puedes modificar las funciones en scripts.js o ajustar los estilos en styles.css.
- **Interfaz Modular:** La estructura del proyecto permite añadir nuevas funcionalidades o gráficos sin afectar el núcleo del simulador.

## Contribuciones
¡Tu colaboración es bienvenida! Para contribuir, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama para tus cambios:

```bash
git checkout -b nombre-de-tu-rama
```
3. Realiza los cambios, asegurándote de probar y documentar cada modificación.
4. Haz commit de tus cambios con un mensaje claro:

```bash
git commit -m "Descripción de los cambios"
```
5. Envía tus cambios a tu repositorio remoto:
```bash
git push origin nombre-de-tu-rama
```
6. Abre un Pull Request en el repositorio original describiendo los cambios y las mejoras realizadas.

## Licencia
Este proyecto se distribuye bajo la licencia Creative Commons BY-NC-ND 4.0. Se permite su uso, distribución y modificación para fines educativos y recreativos, siempre que se atribuya adecuadamente y no se utilice con fines comerciales sin permiso.

**Atribución:** Si utilizas este simulador o partes de su código, por favor incluye la siguiente atribución:

- Desarrollado por: Daniel Palacios Alonso

- Basado en YSystem: [YSystem de Walhalla Ediciones](https://walhallaediciones.gitlab.io/ysystem/)

---
¡Gracias por usar el Simulador de Enfrentamientos para YSystem (V2)!
Tu colaboración y tus sugerencias ayudan a mejorar continuamente esta herramienta para la comunidad.
