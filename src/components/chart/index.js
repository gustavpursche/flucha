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

        <div className="you-draw-it__result">
          {sourceLink && (
            <p className="you-draw-it__source typewriter">
              <a href={sourceLink} className="lighter">
                Quelle {sourceLabel ? `: ${sourceLabel}` : ''}
              </a>
            </p>
          )}

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
