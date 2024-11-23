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
- **Gráfica Dinámica**: Representa los resultados en gráficos interactivos utilizando [Highcharts](https://www.highcharts.com/).
- **Responsive Design**: Interfaz totalmente adaptable para su uso en dispositivos móviles, tabletas y ordenadores de escritorio.

---

## Requisitos

Para usar este proyecto no se necesita instalación adicional, solo un navegador moderno. Sin embargo, las siguientes dependencias están incluidas y se cargan desde CDNs:
- [jQuery](https://jquery.com/)
- [DataTables](https://datatables.net/)
- [Font Awesome](https://fontawesome.com/)
- [Highcharts](https://www.highcharts.com/)

---

## Estructura del Proyecto

```plaintext
/
├── index.html        # Página principal del simulador
├── README.md         # Este archivo
├── /assets           # (Opcional) Carpeta para almacenar imágenes o recursos personalizados
