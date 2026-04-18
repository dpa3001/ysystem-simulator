(() => {
    "use strict";

    const elementoTema = document.getElementById("toggleTheme");
    const selectDificultad = document.getElementById("dificultad");
    const botonSimular = document.getElementById("simularBtn");
    const toggleTabla = document.getElementById("toggleTabla");
    const toggleGraficos = document.getElementById("toggleGraphs");
    const contenedorTabla = document.getElementById("tablaContainer");
    const contenedorGraficos = document.getElementById("chartsContainer");

    if (!selectDificultad || !botonSimular || !contenedorTabla || !contenedorGraficos) {
        return;
    }

    function actualizarTextoTema() {
        if (!elementoTema) {
            return;
        }
        const temaClaroActivo = document.body.classList.contains("light");
        elementoTema.textContent = temaClaroActivo ? "Modo oscuro" : "Modo claro";
        elementoTema.setAttribute("aria-pressed", String(!temaClaroActivo));
    }

    if (elementoTema) {
        elementoTema.addEventListener("click", () => {
            document.body.classList.toggle("light");
            actualizarTextoTema();
        });
        actualizarTextoTema();
    }

    const fragmentoDificultad = document.createDocumentFragment();
    for (let valor = 5; valor <= 25; valor++) {
        const opcion = document.createElement("option");
        opcion.value = String(valor);
        opcion.textContent = String(valor);
        fragmentoDificultad.appendChild(opcion);
    }
    selectDificultad.appendChild(fragmentoDificultad);

    let tablaResultados;
    if ($.fn.dataTable.isDataTable("#tablaResultados")) {
        tablaResultados = $("#tablaResultados").DataTable();
    } else {
        tablaResultados = $("#tablaResultados").DataTable({
            language: {
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                infoEmpty: "Mostrando 0 a 0 de 0 registros",
                infoFiltered: "(filtrados de _MAX_ registros totales)",
                zeroRecords: "No se encontraron resultados",
                emptyTable: "No hay resultados para mostrar",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                }
            }
        });
    }

    function sincronizarVisibilidadTabla() {
        if (!toggleTabla) {
            return;
        }
        contenedorTabla.style.display = toggleTabla.checked ? "block" : "none";
    }

    function sincronizarVisibilidadGraficos() {
        if (!toggleGraficos) {
            return;
        }
        contenedorGraficos.style.display = toggleGraficos.checked ? "flex" : "none";
    }

    if (toggleTabla) {
        toggleTabla.addEventListener("change", sincronizarVisibilidadTabla);
        sincronizarVisibilidadTabla();
    }

    if (toggleGraficos) {
        toggleGraficos.addEventListener("change", sincronizarVisibilidadGraficos);
        sincronizarVisibilidadGraficos();
    }

    function lanzarDados(cantidad) {
        const resultados = [];
        for (let indice = 0; indice < cantidad; indice++) {
            resultados.push(Math.floor(Math.random() * 6) + 1);
        }
        return resultados;
    }

    function representarBonificador(valor) {
        return valor > 0 ? `+${valor}` : `${valor}`;
    }

    function simularEnfrentamiento(cantidadBase, cantidadExtra, bonificadorTotal, dificultad) {
        const dadosBase = lanzarDados(cantidadBase);
        const dadosExtra = cantidadExtra > 0 ? lanzarDados(cantidadExtra) : [];
        const todosLosDados = [...dadosBase, ...dadosExtra];

        const dadosBaseHtml = dadosBase.map((dado) => `<span class="base-dado">${dado}</span>`).join(", ");
        const dadosExtraHtml = dadosExtra.map((dado) => `<span class="extra-dado">${dado}</span>`).join(", ");
        const dadosVisual = dadosExtra.length > 0 ? `${dadosBaseHtml} | ${dadosExtraHtml}` : dadosBaseHtml;

        const sumaDados = todosLosDados.reduce((acumulado, valor) => acumulado + valor, 0);
        const resultadoPJ = sumaDados + bonificadorTotal;
        const numeroSeises = todosLosDados.filter((dado) => dado === 6).length;
        const numeroUnos = todosLosDados.filter((dado) => dado === 1).length;

        let resultadoFinal;
        if (numeroSeises >= 2) {
            resultadoFinal = "Crítico";
        } else if (numeroUnos === todosLosDados.length) {
            resultadoFinal = "Pifia";
        } else if (resultadoPJ >= dificultad) {
            resultadoFinal = "Éxito";
        } else {
            resultadoFinal = "Fallo";
        }

        return { dadosVisual, resultadoPJ, resultadoFinal };
    }

    function actualizarResumen(exitos, fracasos, criticos, pifias, totalSimulaciones) {
        const porcentajeExitos = ((exitos / totalSimulaciones) * 100).toFixed(2);
        const porcentajeFallos = ((fracasos / totalSimulaciones) * 100).toFixed(2);

        document.getElementById("totalExitos").textContent = String(exitos);
        document.getElementById("totalFracasos").textContent = String(fracasos);
        document.getElementById("totalCriticos").textContent = String(criticos);
        document.getElementById("totalPifias").textContent = String(pifias);
        document.getElementById("mediaExitos").textContent = `${porcentajeExitos}%`;
        document.getElementById("mediaFallos").textContent = `${porcentajeFallos}%`;
    }

    function limpiarGraficos() {
        ["#pieChart", "#histogramChart", "#barChart", "#lineChart", "#scatterChart"].forEach((selector) => {
            d3.select(selector).select("svg").remove();
        });
    }

    function generarGraficos(simulaciones) {
        if (!simulaciones.length) {
            limpiarGraficos();
            return;
        }

        const frecuenciaResultados = {};
        simulaciones.forEach((simulacion) => {
            frecuenciaResultados[simulacion.outcome] = (frecuenciaResultados[simulacion.outcome] || 0) + 1;
        });

        const datosPastel = Object.entries(frecuenciaResultados).map(([etiqueta, cantidad]) => ({
            label: etiqueta,
            count: cantidad
        }));

        const valores = simulaciones.map((simulacion) => simulacion.value);

        crearGraficoPastel(datosPastel);
        crearHistograma(valores);
        crearGraficoBarrasHorizontal(datosPastel);
        crearGraficoLinea(simulaciones);
        crearGraficoDispersion(simulaciones);
    }

    function crearGraficoPastel(datos) {
        d3.select("#pieChart").select("svg").remove();

        const ancho = 300;
        const alto = 300;
        const radio = Math.min(ancho, alto) / 2;
        const total = d3.sum(datos, (dato) => dato.count);

        const svg = d3
            .select("#pieChart")
            .append("svg")
            .attr("width", ancho)
            .attr("height", alto)
            .style("display", "block")
            .style("margin", "auto")
            .append("g")
            .attr("transform", `translate(${ancho / 2}, ${alto / 2})`);

        const color = d3
            .scaleOrdinal()
            .domain(datos.map((dato) => dato.label))
            .range(["#4daf4a", "#377eb8", "#ff7f00", "#e41a1c"]);

        const pastel = d3
            .pie()
            .value((dato) => dato.count)
            .sort(null);

        const arco = d3.arc().innerRadius(0).outerRadius(radio);

        const arcos = svg.selectAll("g.arc").data(pastel(datos)).enter().append("g").attr("class", "arc");

        arcos
            .append("path")
            .attr("d", arco)
            .attr("fill", (dato) => color(dato.data.label));

        arcos
            .append("text")
            .attr("transform", (dato) => `translate(${arco.centroid(dato)})`)
            .attr("text-anchor", "middle")
            .attr("fill", "var(--text-color)")
            .attr("font-size", "12px")
            .text((dato) => `${dato.data.label}: ${((dato.data.count / total) * 100).toFixed(0)}%`);
    }

    function crearHistograma(valores) {
        d3.select("#histogramChart").select("svg").remove();
        if (!valores.length) {
            return;
        }

        const margen = { top: 20, right: 30, bottom: 30, left: 40 };
        const ancho = 400 - margen.left - margen.right;
        const alto = 300 - margen.top - margen.bottom;

        const svg = d3
            .select("#histogramChart")
            .append("svg")
            .attr("width", ancho + margen.left + margen.right)
            .attr("height", alto + margen.top + margen.bottom)
            .style("display", "block")
            .style("margin", "auto")
            .append("g")
            .attr("transform", `translate(${margen.left},${margen.top})`);

        const minimo = d3.min(valores);
        const maximo = d3.max(valores);

        const escalaX = d3.scaleLinear().domain([minimo, maximo + 1]).range([0, ancho]);

        const umbrales = d3.range(minimo, maximo + 2);
        const histograma = d3.histogram().domain(escalaX.domain()).thresholds(umbrales);
        const intervalos = histograma(valores);

        const escalaY = d3
            .scaleLinear()
            .domain([0, d3.max(intervalos, (intervalo) => intervalo.length)])
            .nice()
            .range([alto, 0]);

        const barras = svg
            .selectAll("g.bar")
            .data(intervalos)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", (intervalo) => `translate(${escalaX(intervalo.x0)},${escalaY(intervalo.length)})`);

        barras
            .append("rect")
            .attr("x", 1)
            .attr("width", (intervalo) => Math.max(0, escalaX(intervalo.x1) - escalaX(intervalo.x0) - 1))
            .attr("height", (intervalo) => alto - escalaY(intervalo.length))
            .attr("fill", "#ff7f00");

        barras
            .append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (intervalo) => (escalaX(intervalo.x1) - escalaX(intervalo.x0)) / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "var(--text-color)")
            .attr("font-size", "12px")
            .text((intervalo) => intervalo.length);

        const valoresTicks = d3.range(minimo + 0.5, maximo + 1, 1);
        svg
            .append("g")
            .attr("transform", `translate(0,${alto})`)
            .call(d3.axisBottom(escalaX).tickValues(valoresTicks).tickFormat((valor) => valor - 0.5));
    }

    function crearGraficoBarrasHorizontal(datos) {
        d3.select("#barChart").select("svg").remove();
        if (!datos.length) {
            return;
        }

        const margen = { top: 20, right: 30, bottom: 30, left: 100 };
        const ancho = 400 - margen.left - margen.right;
        const alto = 200 - margen.top - margen.bottom;

        const svg = d3
            .select("#barChart")
            .append("svg")
            .attr("width", ancho + margen.left + margen.right)
            .attr("height", alto + margen.top + margen.bottom)
            .append("g")
            .attr("transform", `translate(${margen.left},${margen.top})`);

        const escalaY = d3
            .scaleBand()
            .domain(datos.map((dato) => dato.label))
            .range([0, alto])
            .padding(0.1);

        const escalaX = d3
            .scaleLinear()
            .domain([0, d3.max(datos, (dato) => dato.count)])
            .nice()
            .range([0, ancho]);

        svg.append("g").call(d3.axisLeft(escalaY)).selectAll("text").attr("fill", "var(--text-color)");

        svg
            .append("g")
            .attr("transform", `translate(0, ${alto})`)
            .call(d3.axisBottom(escalaX).ticks(5))
            .selectAll("text")
            .attr("fill", "var(--text-color)");

        svg
            .selectAll("rect.bar")
            .data(datos)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", (dato) => escalaY(dato.label))
            .attr("width", (dato) => escalaX(dato.count))
            .attr("height", escalaY.bandwidth())
            .attr("fill", "#4daf4a");

        svg
            .selectAll("text.label")
            .data(datos)
            .enter()
            .append("text")
            .attr("x", (dato) => escalaX(dato.count) + 5)
            .attr("y", (dato) => escalaY(dato.label) + escalaY.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("fill", "var(--text-color)")
            .attr("font-size", "12px")
            .text((dato) => dato.count);
    }

    function crearGraficoLinea(simulaciones) {
        d3.select("#lineChart").select("svg").remove();
        if (!simulaciones.length) {
            return;
        }

        const datos = [];
        let exitosAcumulados = 0;
        simulaciones.forEach((simulacion, indice) => {
            if (simulacion.outcome === "Éxito" || simulacion.outcome === "Crítico") {
                exitosAcumulados++;
            }
            datos.push({
                index: indice + 1,
                successRate: (exitosAcumulados / (indice + 1)) * 100
            });
        });

        const margen = { top: 20, right: 30, bottom: 30, left: 50 };
        const ancho = 500 - margen.left - margen.right;
        const alto = 300 - margen.top - margen.bottom;

        const svg = d3
            .select("#lineChart")
            .append("svg")
            .attr("width", ancho + margen.left + margen.right)
            .attr("height", alto + margen.top + margen.bottom)
            .append("g")
            .attr("transform", `translate(${margen.left}, ${margen.top})`);

        // Cuando solo hay una simulación, dejamos un margen extra para no colapsar la escala X.
        const maximoIndice = Math.max(2, datos.length);
        const escalaX = d3.scaleLinear().domain([1, maximoIndice]).range([0, ancho]);
        const escalaY = d3.scaleLinear().domain([0, 100]).range([alto, 0]);

        const linea = d3
            .line()
            .x((dato) => escalaX(dato.index))
            .y((dato) => escalaY(dato.successRate));

        svg
            .append("path")
            .datum(datos)
            .attr("fill", "none")
            .attr("stroke", "#e41a1c")
            .attr("stroke-width", 2)
            .attr("d", linea);

        svg
            .append("g")
            .attr("transform", `translate(0, ${alto})`)
            .call(d3.axisBottom(escalaX).ticks(5))
            .selectAll("text")
            .attr("fill", "var(--text-color)");

        svg
            .append("g")
            .call(d3.axisLeft(escalaY).ticks(5))
            .selectAll("text")
            .attr("fill", "var(--text-color)");
    }

    function crearGraficoDispersion(simulaciones) {
        d3.select("#scatterChart").select("svg").remove();
        if (!simulaciones.length) {
            return;
        }

        const margen = { top: 20, right: 30, bottom: 30, left: 50 };
        const ancho = 500 - margen.left - margen.right;
        const alto = 300 - margen.top - margen.bottom;

        const svg = d3
            .select("#scatterChart")
            .append("svg")
            .attr("width", ancho + margen.left + margen.right)
            .attr("height", alto + margen.top + margen.bottom)
            .append("g")
            .attr("transform", `translate(${margen.left}, ${margen.top})`);

        const datos = simulaciones.map((simulacion, indice) => ({
            index: indice + 1,
            value: simulacion.value
        }));

        const maximoIndice = Math.max(2, datos.length);
        const escalaX = d3.scaleLinear().domain([1, maximoIndice]).range([0, ancho]);

        let minimoY = d3.min(datos, (dato) => dato.value) - 1;
        let maximoY = d3.max(datos, (dato) => dato.value) + 1;
        if (minimoY === maximoY) {
            minimoY -= 1;
            maximoY += 1;
        }
        const escalaY = d3.scaleLinear().domain([minimoY, maximoY]).range([alto, 0]);

        svg
            .append("g")
            .attr("transform", `translate(0, ${alto})`)
            .call(d3.axisBottom(escalaX).ticks(5))
            .selectAll("text")
            .attr("fill", "var(--text-color)");

        svg.append("g").call(d3.axisLeft(escalaY).ticks(5)).selectAll("text").attr("fill", "var(--text-color)");

        svg
            .selectAll("circle")
            .data(datos)
            .enter()
            .append("circle")
            .attr("cx", (dato) => escalaX(dato.index))
            .attr("cy", (dato) => escalaY(dato.value))
            .attr("r", 3)
            .attr("fill", "#377eb8")
            .attr("opacity", 0.7);
    }

    function simularEnfrentamientos() {
        const cantidadBase = Number.parseInt(document.getElementById("HPJ1").value, 10);
        const bonificadorBase = Number.parseInt(document.getElementById("BPJ1").value, 10);
        const dificultad = Number.parseInt(selectDificultad.value, 10);
        const numeroSimulaciones = Number.parseInt(document.getElementById("numSimulaciones").value, 10);
        const recuerdoActivo = document.getElementById("toggleRecuerdo").checked;
        const profesionActiva = document.getElementById("toggleProfesion").checked;

        if (
            Number.isNaN(cantidadBase) ||
            Number.isNaN(bonificadorBase) ||
            Number.isNaN(dificultad) ||
            Number.isNaN(numeroSimulaciones) ||
            numeroSimulaciones < 1
        ) {
            return;
        }

        const cantidadExtra = recuerdoActivo ? 2 : 0;
        const bonificadorTotal = bonificadorBase + (profesionActiva ? 3 : 0);

        tablaResultados.clear();

        let exitos = 0;
        let fracasos = 0;
        let criticos = 0;
        let pifias = 0;
        const datosGraficos = [];

        for (let indice = 0; indice < numeroSimulaciones; indice++) {
            const resultado = simularEnfrentamiento(cantidadBase, cantidadExtra, bonificadorTotal, dificultad);

            if (resultado.resultadoFinal === "Crítico") {
                criticos++;
                exitos++;
            } else if (resultado.resultadoFinal === "Pifia") {
                pifias++;
                fracasos++;
            } else if (resultado.resultadoFinal === "Éxito") {
                exitos++;
            } else {
                fracasos++;
            }

            datosGraficos.push({
                outcome: resultado.resultadoFinal,
                value: resultado.resultadoPJ
            });

            const bonificadorVisible = profesionActiva
                ? `${representarBonificador(bonificadorBase)} <span class="bonus-profesion">(+3)</span>`
                : representarBonificador(bonificadorBase);

            tablaResultados.row.add([
                resultado.dadosVisual,
                bonificadorVisible,
                resultado.resultadoPJ,
                dificultad,
                resultado.resultadoFinal
            ]);
        }

        tablaResultados.draw();
        actualizarResumen(exitos, fracasos, criticos, pifias, numeroSimulaciones);
        generarGraficos(datosGraficos);
    }

    botonSimular.addEventListener("click", simularEnfrentamientos);
})();
