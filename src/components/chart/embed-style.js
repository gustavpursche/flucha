/* eslint-disable import/prefer-default-export */

export const embedStyles = `
  .you-draw-it {
    margin: 1.5rem 0 2.5rem 0;
    position: relative;
    overflow: hidden;
  }

  .you-draw-it__result {
    margin-top: 1rem;
    text-align: center;
  }

  .you-draw-it__result > button {
    background: rgb(120, 120, 120);
    border: none;
    color: white;
    font-family: AkzidenzGroteskRegular, sans-serif;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.75rem 2.5rem;
  }

  .you-draw-it__result > button:not([disabled]) {
    background-color: rgb(60, 60, 60);
    color: white;
  }

  .you-draw-it__result > button:not([disabled]):hover,
  .you-draw-it__result > button:not([disabled]):focus {
    background-color: rgb(20, 20, 20);
    cursor: pointer;
  }

  .you-draw-it__result > button[disabled] {
    background-color: rgb(180, 180, 180);
    color: rgb(105, 105, 105);
  }

  .you-draw-it__result--result-shown > button {
    display: none;
  }

  .you-draw-it__result--result-shown > .you-draw-it__source,
  .you-draw-it__result--result-shown > .you-draw-it__result-text {
    display: block;
  }

  .you-draw-it__source,
  .you-draw-it__result-text {
    display: none;
  }

  .you-draw-it__source {
    margin-top: 1rem;
    text-align: right;
  }

  .you-draw-it__chart {
    margin-left: -5px;
    position: relative;
  }

  .you-draw-it__chart .labels {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    user-select: none;
  }

  .you-draw-it__chart .data-label {
    position: absolute;
    z-index: 2;
  }

  .you-draw-it__chart .area {
    fill: rgb(240, 240, 240);
  }

  .you-draw-it__chart .data-label span {
    color: white;
    display: block;
    font-family: AkzidenzGroteskMedium, sans-serif;
    font-size: 0.85rem;
    font-weight: bold;
    left: -50%;
    line-height: 1;
    margin-top: -43px;
    padding: 5px 10px;
    position: relative;
    text-align: center;
    white-space: nowrap;
  }

  .you-draw-it__chart .data-label.your-result span {
    margin-top: -10px;
  }

  .you-draw-it__chart .data-label.edge-left span {
    left: -10px;
  }

  .you-draw-it__chart .data-label.edge-right span {
    left: auto;
    right: 86%;
  }

  .you-draw-it__chart .data-label.black span {
    background-color: black;
  }

  .you-draw-it__chart .data-label.red span {
    background-color: black;
  }

  .you-draw-it__chart .data-label.your-result span {
    background-color: white;
    color: black;
  }

  .you-draw-it__chart .your-line {
    stroke: rgb(0,255,255);
    stroke-width: 4;
    stroke-dasharray: 1 7;
    stroke-linecap: round;
    fill: none;
  }

  .you-draw-it__chart .grid .domain {
    stroke-width: 0
  }

  .you-draw-it__chart .grid .tick line {
    stroke-dasharray: 1,1;
    opacity: 0.2;
  }

  .you-draw-it__chart .line {
    fill: none;
    stroke-width: 3;
    stroke: black;
  }

  .you-draw-it__chart .line.red {
    stroke: rgb(255,0,255);
  }

  .you-draw-it__chart .axis {
    opacity: .5;
  }

  .you-draw-it__chart .axis,
  .you-draw-it__chart .axis text {
    font-size: 10px;
  }

  .you-draw-it__chart .dots {
    fill: black;
  }

  .you-draw-it__chart .controls {
    align-items: center;
    display: flex;
    font-family: AkzidenzGroteskMedium, sans-serif;
    font-size: 1rem;
    justify-content: center;
    pointer-events: none;
    position: absolute;
  }
`;
