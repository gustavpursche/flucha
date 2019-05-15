import React, { useEffect, useRef } from 'react';

export default ({
  data,
  name,
  truncateAt,
  yUnit,
  draggableLabel,
  buttonLabel,
  revealText,
  sourceLabel,
  sourceLink,
  drawChartFn
}) => {
  const chart = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chart && chart.current) {
      drawChartFn(chart.current);
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
          data-chart-draggable-label={draggableLabel}
        />

        {sourceLink && (
          <p className="you-draw-it__source typewriter">
            <a href={sourceLink} className="lighter">
              {sourceLabel || 'Quelle'}
            </a>
          </p>
        )}

        <div className="you-draw-it__result">
          {buttonLabel && revealText && (
            <button type="button" disabled>
              {buttonLabel}
            </button>
          )}

          {revealText && (
            <p className="you-draw-it__result-text">{revealText}</p>
          )}
        </div>
      </div>
    </div>
  );
};
