import React, { useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import Button from './components/ui/button';
import Chart from './components/chart';
import Input from './components/ui/input';
import Select from './components/ui/select';
import Textarea from './components/ui/textarea';

import './style.css';

const formData = form => {
  const data = new FormData(form);

  return Array.from(data.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

const parseData = data => {
  if (!data) {
    return '';
  }

  const lines = data.split('\n');

  return lines.reduce((acc, line) => {
    const items = line.trim().split(',');

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

const Step1 = ({ data }) => (
  <>
    <Input
      name="name"
      defaultValue={data.name}
      label="Name des Datensets"
      explain="Der Name sollte einmalig pro Artikel vorkommen"
    />
    <Textarea
      name="data"
      defaultValue={data.data}
      label="Datensatz"
      explain="Ein Eintrag pro Zeile"
      placeholder="2019,100"
      rows={10}
      monospace
    />
    <Input
      name="yUnit"
      defaultValue={data.yUnit}
      label="Einheit der Y-Achse"
      explain="Optional"
    />
    <Textarea
      name="revealText"
      defaultValue={data.revealText}
      label="Text"
      explain="Text, der angezeigt werden soll, nachdem das Diagramm fertig gezeichnet wurde"
      rows={5}
    />
    <Input
      name="buttonLabel"
      defaultValue={data.buttonLabel}
      label="Button Beschriftung"
      explain="Beschriftung des Buttons, welcher am Ende die realen Daten anzeigt"
    />
  </>
);

const Step2 = ({ data, selected }) => (
  <Select name="truncateAt" required label="Diagramm sichtbar bis (x Achse)">
    {Object.entries(data).map(([value]) => (
      <option value={value} selected={value === selected}>
        {value}
      </option>
    ))}
  </Select>
);

const Snippet = ({ data, parsedData }) => (
  <>
    <Chart {...data} data={parsedData} />

    <hr className="divider" />

    <h2 className="preview__section-title">1. Artikel vorbereiten</h2>
    <p>
      Am Anfang des Artikels muss folgender Code <em>einmalig</em> eingefügt
      werden:
    </p>

    <code className="code">
      {`
<script src="/sites/all/libraries/d3/d3.min.js"></script>
<style type="text/css"></style>
<script>
  const youDrawIt = el => {};
</script>
`}
    </code>

    <h2 className="preview__section-title">2. Diagramm(e) hinzufügen</h2>
    <p>
      Der folgende Code muss an der Stelle eingefügt werden, an dem das Diagramm
      angezeigt werden soll:
    </p>

    <code className="code">
      {ReactDOMServer.renderToStaticMarkup(
        <Chart {...data} data={parsedData} />
      )}
    </code>

    <h2 className="preview__section-title">3. Artikel abschließen</h2>
    <p>
      Am Ende des Artikels muss folgender Code <em>einmalig</em> eingefügt
      werden:
    </p>

    <code className="code">
      {`
<script>
  const youDrawItDrawAllCharts = () => Array.from(document.querySelectorAll('.js-chart--you-draw-it'), youDrawIt);
  window.addEventListener('resize', youDrawItDrawAllCharts);
  youDrawItDrawAllCharts();
</script>
`}
    </code>
  </>
);

export default () => {
  const form = useRef(null);
  const [dataset, setData] = useState({});
  const [step, setStep] = useState(0);

  return (
    <div className="app">
      <form ref={form}>
        <h2 className="steps">Schritt {step + 1} / 3</h2>

        {step === 0 && (
          <>
            <Step1 data={dataset} />
            <Button
              type="button"
              onClick={() => {
                setStep(1);
                setData(state => ({
                  ...state,
                  ...formData(form.current)
                }));
              }}
            >
              Nächster Schritt
            </Button>
          </>
        )}

        {step === 1 && (
          <>
            <Step2
              data={parseData(dataset.data)}
              selected={dataset.truncateAt}
            />
            <Button
              type="button"
              onClick={() => {
                setStep(2);
                setData(state => ({
                  ...state,
                  ...formData(form.current)
                }));
              }}
            >
              Vorschau erzeugen
            </Button>

            <Button
              type="button"
              secondary
              onClick={() => {
                setStep(0);
              }}
            >
              Zurück
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Snippet data={dataset} parsedData={parseData(dataset.data)} />

            <Button
              type="button"
              secondary
              onClick={() => {
                setStep(1);
              }}
            >
              Zurück
            </Button>
          </>
        )}
      </form>
    </div>
  );
};
