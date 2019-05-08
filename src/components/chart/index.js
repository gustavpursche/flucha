import React, { useEffect, useRef } from 'react';

import Button from '../ui/button';
import createChart from './chart';

import './style.css';

export default ({ data, name, truncateAt, yUnit, buttonLabel, revealText }) => {
  const chart = useRef(null);

  useEffect(() => {
    if (chart && chart.current) {
      createChart(chart.current);
    }
  })

  return (
    <div class="media media-element-container media-default you-draw-it js-chart--you-draw-it" ref={chart}>
      <div className="you-draw-it__chart"
           data-chart-name={name}
           data-chart-data={JSON.stringify(data)}
           data-chart-median-year={truncateAt}
           data-chart-y-unit={yUnit} />

      <div className="you-draw-it__result">
        <Button disabled>{buttonLabel}</Button>
        <p className="you-draw-it__result-text">{revealText}</p>
      </div>
    </div>
  );
}
