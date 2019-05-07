import React, { useRef, useState } from 'react';
import slugify from 'slugify';

import Button from './components/ui/button';
import Chart from './components/chart';
import Input from './components/ui/input';
import Select from './components/ui/select';
import Textarea from './components/ui/textarea';

import './style.css';

const formData = form => {
  const formData = new FormData(form);

  return Array.from(formData.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

const parseName = name => {
  return slugify(name);
};

const parseData = data => {
  if (!data) {
    return '';
  }

  const lines = data.split('\n');

  return lines.reduce((acc, line) => {
    const items = line.trim().split(' ');

    if (!items) {
      return acc;
    }

    let [key, value = ''] = items;

    key = key.trim();
    value = value.trim();

    if (key && value) {
      acc[Number(key)] = Number(value);
    }

    return acc;
  }, {});
};

const Step1 = () => (
  <>
    <Input name="name" label="Name des Datensets" required />
    <Textarea name="data" label="Daten" explain="Einen Eintrag pro Zeile" placeholder="2019 100" rows={10} monospace required />
    <Input name="yUnit" label="Einheit der Y-Achse" required />
    <Textarea name="revealText" label="Text" explain="Text, der angezeigt werden soll, nachdem das Diagramm fertig gezeichnet wurde" rows={5} required />
    <Input name="buttonLabel" label="Button Beschriftung" required />
  </>
);

const Step2 = ({ data }) => (
  <Select name="truncateAt" required label="Diagramm zeichnen bis">
    {Object.entries(data).map(([value]) => (
      <option value={value}>{value}</option>
    ))}
  </Select>
);

const Snippet = ({ snipped, ...props }) => (
  <>
    <h2>Preview</h2>

    <Chart {...props} />

    <h2>Prepare the article</h2>
    <p>Add the following snippet at the beginning of your article</p>

    <pre>
{`
<script src="/sites/all/libraries/d3/d3.min.js"></script>
`}
    </pre>

    <h3>Add chart</h3>
    <p>Add the following snippet at the location, where you want the
      render the chart.
    </p>

    <pre>
      {snipped}
    </pre>
  </>
);

export default () => {
  const form = useRef(null);
  const [dataset, setData] = useState({});
  const [step, setStep] = useState(0);

  return (
    <div className="app">
      <form ref={form}>
        <h2 className="steps">Step {step + 1} / 3</h2>

        {step === 0 && (
          <>
            <Step1 />
            <Button type="button" onClick={() => {
              setStep(1);
              setData(state => ({
                ...state,
                ...formData(form.current)
              }));
            }}>Next Step</Button>
          </>
        )}

        {step === 1 && (
          <>
            <Step2 data={parseData(dataset.data)} />
            <Button type="button" onClick={() => {
              setStep(2);
              setData(state => ({
                ...state,
                ...formData(form.current)
              }));
            }}>Generate Preview</Button>
          </>
        )}

        {step === 2 && (
          <Snippet data={parseData(dataset.data)} name={parseName(dataset.name)} medianYear={dataset.truncateAt} snippet={`
            <div class="media media-element-container media-default">
              <div class="js-chart--you-draw-it" data-chart-name="${parseName(dataset.name)}" data-chart-data='${JSON.stringify(parseData(dataset.data))}' data-chart-button-label="${dataset.buttonLabel}" data-chart-truncate="${dataset.truncateAt}"></div>
              <p>${dataset.revealText}</p>
            </div>
          `} yUnit={dataset.yUnit} buttonLabel={dataset.buttonLabel} />
        )}
      </form>
    </div>
  );
}
