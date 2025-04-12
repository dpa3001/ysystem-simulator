// Alternar el tema aplicando la clase "light" al <body>
document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  document.getElementById('toggleTheme').textContent = isLight ? 'Modo Oscuro' : 'Modo Claro';
});

// Rellenar el selector de Dificultad
const dificultadSelect = document.getElementById("dificultad");
for (let i = 5; i <= 25; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  dificultadSelect.appendChild(opt);
}

// Inicializar DataTable y toggle de la tabla
$(document).ready(function () {
  $('#tablaResultados').DataTable();
  $('#toggleTabla').on('change', function () {
    $('#tablaContainer').toggle(this.checked);
  });  
});

// Inicializar el gráfico de dispersión y el toggle de gráficos
document.getElementById('toggleGraphs').addEventListener('change', function() {
  document.getElementById('chartsContainer').style.display = this.checked ? 'flex' : 'none';
});


// Función para lanzar n dados de 6 caras
function rollDice(n) {
  const resultados = [];
  for (let i = 0; i < n; i++) {
    resultados.push(Math.floor(Math.random() * 6) + 1);
  }
  return resultados;
}

// Función para simular un enfrentamiento (dados base y extra)
function simularEnfrentamiento(baseCount, extraCount, bonificador, dificultad) {
  const baseDice = rollDice(baseCount);
  const extraDice = extraCount > 0 ? rollDice(extraCount) : [];
  const allDice = baseDice.concat(extraDice);

  const baseDiceHtml = baseDice.map(d => `<span class="base-dado">${d}</span>`).join(", ");
  const extraDiceHtml = extraDice.map(d => `<span class="extra-dado">${d}</span>`).join(", ");
  const dadosVisual = extraDice.length > 0 ? `${baseDiceHtml} | ${extraDiceHtml}` : baseDiceHtml;

  const sumaDados = allDice.reduce((acc, val) => acc + val, 0);
  const resultadoPJ = sumaDados + bonificador;
  const seises = allDice.filter(d => d === 6).length;
  const unos = allDice.filter(d => d === 1).length;

  let resultadoFinal;
  if (seises >= 2) resultadoFinal = "Crítico";
  else if (unos === allDice.length) resultadoFinal = "Pifia";
  else if (resultadoPJ >= dificultad) resultadoFinal = "Éxito";
  else resultadoFinal = "Fallo";

  return { dadosVisual, resultadoPJ, resultadoFinal, seises, unos };
}

/* FUNCION PRINCIPAL DE SIMULACIÓN Y GRÁFICOS */
function simularEnfrentamientos() {
  const baseDiceCount = parseInt(document.getElementById("HPJ1").value);
  const bonificadorBase = parseInt(document.getElementById("BPJ1").value);
  const dificultad = parseInt(document.getElementById("dificultad").value);
  const numSimulaciones = parseInt(document.getElementById("numSimulaciones").value);
  
  // Leer estados de los toggle switches para "Recuerdo cuando..." y "+3 de Profesión"
  const recuerdoActivo = document.getElementById("toggleRecuerdo").checked;
  const profesionActivo = document.getElementById("toggleProfesion").checked;
  
  const extraDiceCount = recuerdoActivo ? 2 : 0;
  const bonificadorExtra = profesionActivo ? 3 : 0;
  
  const totalBonificador = bonificadorBase + bonificadorExtra;
  
  const tabla = $('#tablaResultados').DataTable();
  tabla.clear();
  
  let exitos = 0, fracasos = 0, criticos = 0, pifias = 0;
  const resultadosSimulacion = [];  // Para gráficos
  
  for (let i = 0; i < numSimulaciones; i++) {
    const sim = simularEnfrentamiento(baseDiceCount, extraDiceCount, totalBonificador, dificultad);
    
    if (sim.resultadoFinal === "Crítico") { criticos++; exitos++; }
    else if (sim.resultadoFinal === "Pifia") { pifias++; fracasos++; }
    else if (sim.resultadoFinal === "Éxito") { exitos++; }
    else { fracasos++; }
    
    // Guardar datos de interés para gráficos
    resultadosSimulacion.push({ outcome: sim.resultadoFinal, value: sim.resultadoPJ });
    
    const bonificadorTexto = profesionActivo 
          ? `${bonificadorBase} <span class="bonus-profesion">( +3 )</span>`
          : `${bonificadorBase}`;
    
    tabla.row.add([
      sim.dadosVisual,
      bonificadorTexto,
      sim.resultadoPJ,
      dificultad,
      sim.resultadoFinal
    ]);
  }
  
  tabla.draw();
  
  const porcentajeExitos = ((exitos / numSimulaciones) * 100).toFixed(2);
  const porcentajeFallos = ((fracasos / numSimulaciones) * 100).toFixed(2);
  
  document.getElementById("totalExitos").textContent = exitos;
  document.getElementById("totalFracasos").textContent = fracasos;
  document.getElementById("totalCriticos").textContent = criticos;
  document.getElementById("totalPifias").textContent = pifias;
  document.getElementById("mediaExitos").textContent = `${porcentajeExitos}%`;
  document.getElementById("mediaFallos").textContent = `${porcentajeFallos}%`;
  
  // Generar gráficos con los datos de la simulación
  generarGraficos(resultadosSimulacion);
}

/* FUNCIONES DE GRÁFICOS CON D3.JS */
// Esta función recopila las estadísticas y llama a cada función de gráfico
function generarGraficos(simulaciones) {
  // Gráfico de pastel: distribución de resultados finales
  let outcomeCounts = {};
  simulaciones.forEach(s => {
    outcomeCounts[s.outcome] = (outcomeCounts[s.outcome] || 0) + 1;
  });
  let pieData = [];
  for (let key in outcomeCounts) {
    pieData.push({ label: key, count: outcomeCounts[key] });
  }
  createPieChart(pieData);

  // Histograma: distribución de 'resultadoPJ' (suma total)
  let values = simulaciones.map(s => s.value);
  createHistogram(values);

  // Gráfico de barras horizontal: frecuencia de cada resultado final
  createHorizontalBarChart(pieData);

  // Gráfico de línea: promedio acumulado de éxitos (en %)
  createLineChart(simulaciones);

  // Gráfico de dispersión: índice vs. resultadoPJ
  createScatterPlot(simulaciones);
}

function createPieChart(data) {
  d3.select("#pieChart").select("svg").remove();
  const width = 300, height = 300, radius = Math.min(width, height) / 2;
  
  const svg = d3.select("#pieChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "auto")
    .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

  
  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(["#4daf4a", "#377eb8", "#ff7f00", "#e41a1c"]);
  
  const pie = d3.pie()
      .value(d => d.count)
      .sort(null);
  
  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
  
  const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");
  
  arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label));
  
  arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--text-color)")
      .attr("font-size", "12px")
      .text(d => `${d.data.label}: ${d.data.count}`);
}

// Gráfico de histograma: distribución de 'resultadoPJ' (suma total)
// Se usa un histograma para mostrar la frecuencia de cada resultadoPJ
function createHistogram(values) {
  d3.select("#histogramChart").select("svg").remove();
  const margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
  
  const svg = d3.select("#histogramChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("display", "block")
      .style("margin", "auto")
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Calcular mínimo y máximo de los valores (que son enteros)
  const minVal = d3.min(values);
  const maxVal = d3.max(values);
  
  // Establecer la escala X para valores discretos (enteros)
  const x = d3.scaleLinear()
      .domain([minVal, maxVal + 1])
      .range([0, width]);
  
  // Crear bins para cada entero (incluyendo maxVal)
  const thresholds = d3.range(minVal, maxVal + 2);  // +2 para incluir el último valor en su bin
  const histogram = d3.histogram()
      .domain(x.domain())
      .thresholds(thresholds);
  const bins = histogram(values);
  
  const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)]).nice()
      .range([height, 0]);
  
  const bar = svg.selectAll(".bar")
      .data(bins)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`);
  
  bar.append("rect")
      .attr("x", 1)
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("height", d => height - y(d.length))
      .attr("fill", "#ff7f00");
  
  bar.append("text")
      .attr("dy", ".75em")
      .attr("y", -12)
      .attr("x", d => (x(d.x1) - x(d.x0)) / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--text-color)")
      .attr("font-size", "12px")
      .text(d => d.length);
  
  // Generar tick values centrados en cada bin: el centro de cada bin es (i + 0.5)
  const tickValues = d3.range(minVal + 0.5, maxVal + 1, 1);
  svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x)
            .tickValues(tickValues)
            // Formato: mostrar los enteros (restando 0.5)
            .tickFormat(d => d - 0.5));
}

// Gráfico de barras horizontal para frecuencia de cada resultado final
function createHorizontalBarChart(data) {
  d3.select("#barChart").select("svg").remove();
  const margin = { top: 20, right: 30, bottom: 30, left: 100 },
        width = 400 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
  
  const svg = d3.select("#barChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const y = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, height])
      .padding(0.1);

  const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]).nice()
      .range([0, width]);

  svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "var(--text-color)");

  svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .attr("fill", "var(--text-color)");

  svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.label))
      .attr("width", d => x(d.count))
      .attr("height", y.bandwidth())
      .attr("fill", "#4daf4a");

  svg.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => x(d.count) + 5)
      .attr("y", d => y(d.label) + y.bandwidth() / 2)
      .attr("dy", ".35em")
      .attr("fill", "var(--text-color)")
      .attr("font-size", "12px")
      .text(d => d.count);
}

// Gráfico de línea que muestra el promedio acumulado de éxitos (en %)
// Se usa un gráfico de línea para mostrar la tasa de éxito acumulada a lo largo de las simulaciones
// Se calcula el porcentaje de éxitos acumulados en cada simulación
function createLineChart(simulaciones) {
  d3.select("#lineChart").select("svg").remove();
  const data = [];
  let cumulSuccess = 0;
  simulaciones.forEach((s, i) => {
    if (s.outcome === "Éxito" || s.outcome === "Crítico") cumulSuccess++;
    data.push({ index: i + 1, successRate: (cumulSuccess / (i + 1)) * 100 });
  });

  const margin = { top: 20, right: 30, bottom: 30, left: 50 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

  const svg = d3.select("#lineChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleLinear()
      .domain([1, data.length])
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

  const line = d3.line()
      .x(d => x(d.index))
      .y(d => y(d.successRate));

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#e41a1c")
      .attr("stroke-width", 2)
      .attr("d", line);

  svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .attr("fill", "var(--text-color)");

  svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .attr("fill", "var(--text-color)");
}

// Gráfico de dispersión: índice vs. resultadoPJ
// Se usa un gráfico de dispersión para mostrar la relación entre el índice de simulación y el resultadoPJ
function createScatterPlot(simulaciones) {
  d3.select("#scatterChart").select("svg").remove();
  const margin = { top: 20, right: 30, bottom: 30, left: 50 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

  const svg = d3.select("#scatterChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const data = simulaciones.map((s, i) => ({ index: i + 1, value: s.value }));

  const x = d3.scaleLinear()
      .domain([1, data.length])
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.value) - 1, d3.max(data, d => d.value) + 1])
      .range([height, 0]);

  svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .attr("fill", "var(--text-color)");

  svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .attr("fill", "var(--text-color)");

  svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.index))
      .attr("cy", d => y(d.value))
      .attr("r", 3)
      .attr("fill", "#377eb8")
      .attr("opacity", 0.7);
}

document.getElementById("simularBtn").addEventListener("click", simularEnfrentamientos);
