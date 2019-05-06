import React, { useEffect, useRef } from 'react';

import createChart from './chart';

import './style.css';

export default ({ data, name, medianYear }) => {
  const chart = useRef(null);
  const result = useRef(null);

  useEffect(() => {
    if (chart && chart.current) {
      createChart(chart.current, result.current);
    }
  })

  return (
    <>
      <div className="you-draw-it" ref={chart} data-chart-data={JSON.stringify(data)} data-chart-name={name} data-chart-median-year={medianYear} />
      <div ref={result}>
        <button type="button" disabled>Show real results</button>
      </div>
    </>
  );
}
