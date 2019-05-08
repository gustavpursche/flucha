/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign  */

import * as d3 from 'd3';

export default el => {
  const state = {};
  const chartEl = el.querySelector('.you-draw-it__chart');
  const sel = d3.select(chartEl);
  const {
    chartData,
    chartName: key,
    chartMedianYear,
    chartYUnit
  } = chartEl.dataset;
  const medianYear = parseInt(chartMedianYear, 10);
  const indexedData = JSON.parse(chartData);
  const resultSection = d3.select(el.querySelector('.you-draw-it__result'));
  const data = Object.keys(indexedData).map(dataKey => ({
    year: Number(dataKey),
    value: indexedData[dataKey]
  }));

  if (!state[key]) {
    state[key] = {};
  }

  const isMobile = window.innerWidth < 760;
  const minYear = data[0].year;
  const maxYear = data[data.length - 1].year;
  const minY = d3.min(data, d => d.value);
  const maxY = d3.max(data, d => d.value);

  // eslint-disable-next-line func-names
  const ƒ = function() {
    // eslint-disable-next-line prefer-rest-params
    const functions = arguments;

    // convert all string arguments into field accessors
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < functions.length; i++) {
      if (
        typeof functions[i] === 'string' ||
        typeof functions[i] === 'number'
      ) {
        functions[i] = (str => d => d[str])(functions[i]);
      }
    }

    // return composition of functions
    return d => {
      let i = 0;
      const l = functions.length;

      // eslint-disable-next-line no-plusplus
      while (i++ < l) {
        // eslint-disable-next-line no-param-reassign
        d = functions[i - 1].call(this, d);
      }

      return d;
    };
  };

  const drawAxis = c => {
    c.axis
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${c.height})`)
      .call(c.xAxis);

    // Null-Linie
    if (graphMinY < 0) {
      c.axis
        .append('g')
        .classed('nullaxis', true)
        .attr('transform', `translate(0,${c.y(0)})`)
        .call(
          d3
            .axisBottom(c.x)
            .tickValues([])
            .tickSize(0)
        );
    }

    // null auf y-achse
    c.axis
      .append('text')
      .text('0')
      .attr('transform', `translate(-15, ${c.y(0) + 5})`);
  };

  const formatValue = (val, defaultPrecision) => {
    const valData = defaultPrecision
      ? Number(val).toFixed(defaultPrecision)
      : val;

    return (
      String(valData).replace('.', ',') + (chartYUnit ? ` ${chartYUnit}` : '')
    );
  };

  const makeLabel = (pos, addClass) => {
    const x = c.x(pos);
    const y = c.y(indexedData[pos]);
    const text = formatValue(indexedData[pos]);

    const label = c.labels
      .append('div')
      .classed('data-label', true)
      .classed(addClass, true)
      .style('left', `${x}px`)
      .style('top', `${y}px`);
    label.append('span').text(text);

    if (pos === minYear && isMobile) {
      label.classed('edge-left', true);
    }

    if (pos === maxYear && isMobile) {
      label.classed('edge-right', true);
    }

    return [
      c.dots
        .append('circle')
        .attr('r', 5)
        .attr('cx', x)
        .attr('cy', y)
        .attr('class', addClass),
      label
    ];
  };

  const drawChart = (lower, upper, addClass) => {
    const definedFn = d => d.year >= lower && d.year <= upper;
    const area = d3
      .area()
      .x(ƒ('year', c.x))
      .y0(ƒ('value', c.y))
      .y1(c.height)
      .defined(definedFn);
    const line = d3
      .area()
      .x(ƒ('year', c.x))
      .y(ƒ('value', c.y))
      .defined(definedFn);

    if (lower === minYear) {
      makeLabel(minYear, addClass);
    }

    const svgClass = addClass + (upper === medianYear ? ' median' : '');

    const group = c.charts.append('g');
    group
      .append('path')
      .attr('d', area(data))
      .attr('class', `area ${svgClass}`)
      .attr('fill', `url(#gradient-${addClass})`);
    group
      .append('path')
      .attr('d', line(data))
      .attr('class', `line ${svgClass}`);

    return [group].concat(makeLabel(upper, svgClass));
  };

  const clamp = (a, b, c) => Math.max(a, Math.min(b, c));

  // make visual area empty
  sel.html('');

  const margin = {
    top: 20,
    right: isMobile ? 20 : 50,
    bottom: 20,
    left: isMobile ? 20 : 50
  };
  const width = sel.node().offsetWidth;
  const height = 400;
  const c = {
    width: width - (margin.left + margin.right),
    height: height - (margin.top + margin.bottom)
  };

  // configure scales
  const graphMinY = Math.min(minY, 0);
  const graphMaxY = Math.max(
    indexedData[medianYear] * 2,
    maxY + (maxY - graphMinY)
  );
  c.x = d3.scaleLinear().range([0, c.width]);
  c.x.domain([minYear, maxYear]);
  c.y = d3.scaleLinear().range([c.height, 0]);
  c.y.domain([graphMinY, graphMaxY]);

  c.svg = sel
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .attr('width', c.width)
    .attr('height', c.height);

  // make background grid
  c.grid = c.svg.append('g').attr('class', 'grid');
  c.grid
    .append('g')
    .attr('class', 'horizontal')
    .call(
      d3
        .axisBottom(c.x)
        .tickValues(c.x.ticks(maxYear - minYear))
        .tickFormat('')
        .tickSize(c.height)
    );

  c.grid
    .append('g')
    .attr('class', 'vertical')
    .call(
      d3
        .axisLeft(c.y)
        .tickValues(c.y.ticks(6))
        .tickFormat('')
        .tickSize(-c.width)
    );

  const applyMargin = marginEl => {
    marginEl
      .style('left', `${margin.left}px`)
      .style('top', `${margin.top}px`)
      .style('width', `${c.width}px`)
      .style('height', `${c.height}px`);
  };

  // invisible rect for dragging to work
  const dragArea = c.svg
    .append('rect')
    .attr('class', 'draggable')
    .attr('x', c.x(medianYear))
    .attr('width', c.x(maxYear) - c.x(medianYear))
    .attr('height', c.height)
    .attr('opacity', 0);

  const clientRect = c.svg.node().getBoundingClientRect();
  c.top = clientRect.top + window.scrollY;
  c.bottom = clientRect.bottom + window.scrollY;

  c.labels = sel
    .append('div')
    .attr('class', 'labels')
    .call(applyMargin);
  c.axis = c.svg.append('g');
  c.charts = c.svg.append('g');

  const userSel = c.svg.append('path').attr('class', 'your-line');
  c.dots = c.svg.append('g').attr('class', 'dots');

  // configure axes
  c.xAxis = d3.axisBottom().scale(c.x);
  c.xAxis.tickFormat(d => `'${String(d).substr(2)}`).ticks(maxYear - minYear);

  drawAxis(c);

  // make chart
  const charts = [];

  charts.push(drawChart(minYear, medianYear, 'black'));
  charts.push(drawChart(medianYear, maxYear, 'red'));

  const resultChart = charts[charts.length - 1][0];
  const resultClip = c.charts
    .append('clipPath')
    .attr('id', `result-clip-${key}`)
    .append('rect')
    .attr('width', c.x(medianYear))
    .attr('height', c.height);
  const resultLabel = charts[charts.length - 1].slice(1, 3);
  resultChart
    .attr('clip-path', `url(#result-clip-${key})`)
    .append('rect')
    .attr('width', c.width)
    .attr('height', c.height)
    .attr('fill', 'none');
  resultLabel.map(e => e.style('opacity', 0));

  /**
   * Interactive user selection part
   */
  const userLine = d3
    .line()
    .x(ƒ('year', c.x))
    .y(ƒ('value', c.y));

  if (!state[key].yourData) {
    state[key].yourData = data
      .map(d => ({
        year: d.year,
        value: indexedData[medianYear],
        defined: false
      }))
      .filter(d => {
        if (d.year === medianYear) {
          d.defined = true;
        }

        return d.year >= medianYear;
      });
  }

  const drawUserLine = () => {
    userSel.attr('d', userLine.defined(ƒ('defined'))(state[key].yourData));

    const d = state[key].yourData[state[key].yourData.length - 1];

    if (!d.defined) {
      return;
    }

    const yourResult = c.labels.selectAll('.your-result').data([d]);
    yourResult
      .enter()
      .append('div')
      .classed('data-label your-result', true)
      .classed('edge-right', isMobile)
      .merge(yourResult)
      .style('left', () => `${c.x(maxYear)}px`)
      .style('top', r => `${c.y(r.value)}px`)
      .html('')
      .append('span')
      .text(r => formatValue(r.value, 2));
  };

  drawUserLine();

  const interactionHandler = () => {
    if (state[key].resultShown) {
      return;
    }

    sel.node().classList.add('drawn');

    const pos = d3.mouse(c.svg.node());
    const year = clamp(medianYear, maxYear, c.x.invert(pos[0]));
    const value = clamp(c.y.domain()[0], c.y.domain()[1], c.y.invert(pos[1]));

    state[key].yourData.forEach(d => {
      if (d.year > medianYear) {
        if (Math.abs(d.year - year) < 0.5) {
          d.value = value;
        }
        if (d.year - year < 0.5) {
          d.defined = true;
        }
      }
    });

    drawUserLine();

    if (
      !state[key].completed &&
      d3.mean(state[key].yourData, ƒ('defined')) === 1
    ) {
      state[key].completed = true;
      resultSection.node().classList.add('you-draw-it__result--is-finished');
      resultSection
        .select('button')
        .node()
        .removeAttribute('disabled');
    }
  };

  c.svg.call(d3.drag().on('drag', interactionHandler));
  c.svg.on('click', interactionHandler);

  const showResultChart = () => {
    if (!state[key].completed) {
      return;
    }

    state[key].resultShown = true;

    resultClip
      .transition()
      .duration(700)
      .attr('width', c.x(maxYear));

    dragArea.attr('class', '');

    resultLabel.map(e => e.style('opacity', 1));
    resultSection.node().classList.add('you-draw-it__result--result-shown');
  };

  resultSection.select('button').on('click', showResultChart);

  if (state[key].resultShown) {
    showResultChart();
  }
};
