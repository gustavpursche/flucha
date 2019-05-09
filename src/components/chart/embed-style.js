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
`;
