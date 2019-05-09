/* eslint-disable import/prefer-default-export */

export const embedStyles = `
  .you-draw-it {
    margin: 1.5rem 0;
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
    color: currentColor;
  }

  .you-draw-it__result--result-shown > button {
    display: none;
  }

  .you-draw-it__result--result-shown > .you-draw-it__result-text {
    display: block;
  }

  .you-draw-it__result-text {
    display: none;
  }

  .you-draw-it__source {
    margin-top: 1rem;
    text-align: right;
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
    position: relative;
    margin-top: -43px;
    left: -50%;
    padding: 5px 15px;
    color: white;
    display: block;
    text-align: center;
    line-height: 16px;
    white-space: nowrap;
    font-weight: bold;
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
    background-color: red;
  }

  .you-draw-it__chart .data-label.your-result span {
    background-color: blue;
  }

  .you-draw-it__chart .your-line {
    stroke: black;
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
    stroke: black;
  }

  .you-draw-it__chart .axis {
    opacity: .5;
  }

  .you-draw-it__chart .axis text {
    font-size: 10px;
  }

  .you-draw-it__chart .dots {
    fill: black;
  }
`;
