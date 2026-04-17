# Simulador de Enfrentamientos para YSystem (v3)

Aplicación web estática para simular enfrentamientos del sistema **YSystem** y consultar una tabla estadística completa de probabilidades por dificultad, dados y bonificadores.

## Descripción general

El proyecto tiene ahora dos vistas principales:

- `index.html`: simulador interactivo de tiradas.
- `estadisticas.html`: tabla estadística completa alimentada desde `datos_estadisticos.json`.

Desde la página principal se puede acceder a la tabla completa mediante el botón **Tabla estadística completa**.

## Acceso rápido

- [Abrir simulador online](https://dpa3001.github.io/ysystem-simulator/)
- [Abrir tabla estadística completa](https://dpa3001.github.io/ysystem-simulator/estadisticas.html)

## Funcionalidades actuales

### Simulador principal

En `index.html` se puede:

- Seleccionar **Habilidad PJ1** entre 1 y 3 dados.
- Seleccionar **Bonificador PJ1** entre `0`, `+1`, `+2`, `+4` y `+6`.
- Elegir **Dificultad** entre `5` y `25`.
- Ejecutar entre `1` y `1000` simulaciones.
- Activar la opción **Recuerdo cuando...**, que añade `2` dados extra.
- Activar la opción **+3 de Profesión**, que suma `+3` al bonificador base.
- Mostrar u ocultar la tabla de resultados.
- Mostrar u ocultar los gráficos.
- Consultar estadísticas agregadas de éxitos, fracasos, críticos, pifias y medias porcentuales.

### Visualizaciones del simulador

Tras cada simulación, `scripts.js` genera gráficos con **D3.js**:

- Gráfico de pastel de resultados finales.
- Histograma de la suma total.
- Gráfico de barras horizontal por tipo de resultado.
- Gráfico de línea con el promedio acumulado de éxitos.
- Gráfico de dispersión entre índice de simulación y suma total.

### Tabla estadística completa

La vista `estadisticas.html` ofrece una consulta independiente de probabilidades precomputadas:

- Carga los datos desde `datos_estadisticos.json`.
- Permite búsqueda libre por dificultad, tramo, dados, bonificador o interpretación.
- Incluye filtros por:
  - dificultad
  - tramo
  - dados
  - bonificador
  - interpretación
- Permite ordenar columnas haciendo clic en los encabezados.
- Resume filas visibles, éxito medio, fallo medio y rango consultado.
- Permite exportar la vista filtrada a CSV.
- Incluye botón para volver al simulador principal.

## Datos estadísticos

El archivo `datos_estadisticos.json` contiene la tabla base usada por `estadisticas.html`.

- Total de registros: `1155`
- Dificultades cubiertas: de `5` a `25`
- Dados cubiertos: de `1D` a `5D`
- Bonificadores cubiertos: de `0` a `10`
- Tramos incluidos: `Muy fácil`, `Fácil`, `Media`, `Desafiante`, `Difícil`, `Muy difícil` y `Extrema`
- Interpretaciones incluidas: `Muy favorable`, `Fiable`, `Disputada`, `Arriesgada`, `Desesperada` y `Casi imposible`

## Tecnologías y dependencias

El proyecto funciona en navegador y utiliza recursos cargados por CDN:

- [jQuery](https://jquery.com/)
- [DataTables](https://datatables.net/)
- [D3.js](https://d3js.org/)
- [Font Awesome](https://fontawesome.com/)

No hay proceso de compilación ni dependencias instalables del lado del proyecto.

## Estructura del proyecto

```text
/
|-- index.html                 # Simulador principal
|-- estadisticas.html          # Tabla estadística completa
|-- datos_estadisticos.json    # Datos precomputados para la tabla estadística
|-- scripts.js                 # Lógica del simulador y gráficos
|-- styles.css                 # Estilos del simulador principal
`-- README.md                  # Documentación del proyecto
```

## Cómo ejecutarlo

Como `estadisticas.html` carga `datos_estadisticos.json` mediante `fetch`, conviene servir el proyecto desde un servidor local o publicarlo en un hosting estático.

Opciones recomendadas:

1. Abrir la carpeta con una extensión tipo Live Server en VS Code.
2. Publicarlo en GitHub Pages o en cualquier servidor estático.
3. Levantar un servidor HTTP simple y abrir `index.html` desde esa URL.

## Flujo de uso recomendado

1. Abre `index.html`.
2. Configura dados, bonificador, dificultad y número de simulaciones.
3. Activa si lo necesitas `Recuerdo cuando...` y/o `+3 de Profesión`.
4. Ejecuta la simulación.
5. Revisa la tabla y los gráficos.
6. Pulsa **Tabla estadística completa** para abrir `estadisticas.html`.
7. Filtra, ordena o exporta la tabla estadística según la combinación que quieras consultar.

## Licencia

Este proyecto se distribuye bajo licencia **Creative Commons BY-NC-ND 4.0**.

## Autoría

- Desarrollado por: Daniel Palacios Alonso
- Basado en YSystem de [Walhalla Ediciones](https://walhallaediciones.gitlab.io/ysystem/)
