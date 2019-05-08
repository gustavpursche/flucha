import React, { useEffect, useRef } from 'react';

import Button from '../ui/button';
import createChart from './chart';

import './style.css';

export default ({
  data,
  name,
  truncateAt,
  yUnit,
  buttonLabel,
  revealText,
  sourceLabel,
  sourceLink
}) => {
  const chart = useRef(null);

  useEffect(() => {
    if (chart && chart.current) {
      createChart(chart.current);
    }
  });

  return (
    <div
      className="articleBlock articleBlockStandard you-draw-it js-chart--you-draw-it"
      ref={chart}
    >
      <div>
        <div
          className="you-draw-it__chart"
          data-chart-name={name}
          data-chart-data={JSON.stringify(data)}
          data-chart-median-year={truncateAt}
          data-chart-y-unit={yUnit}
        />

        {sourceLink && (
          <p className="you-draw-it__source typewriter">
            <a href={sourceLink} className="lighter">
              {sourceLabel || 'Quelle'}
            </a>
          </p>
        )}

        <div className="you-draw-it__result">
          <Button disabled>{buttonLabel}</Button>
          <p className="you-draw-it__result-text">{revealText}</p>
        </div>
      </div>
    </div>
  );
};
