import React, { useEffect, useRef } from 'react';

import createChart from './chart';

import './style.css';

export default ({ data, name, medianYear, yUnit, buttonLabel }) => {
  const chart = useRef(null);
  const result = useRef(null);

  useEffect(() => {
    if (chart && chart.current) {
      createChart(chart.current, result.current);
    }
  })

  return (
    <>
      <div className="you-draw-it"
           ref={chart}
           data-chart-name={name}
           data-chart-data={JSON.stringify(data)}
           data-chart-median-year={medianYear}
           data-chart-y-unit={yUnit} />
      <div ref={result}>
        <button type="button" disabled>{buttonLabel}</button>
      </div>
    </>
  );
}
