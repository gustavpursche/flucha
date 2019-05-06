import React, { useRef, useState } from 'react';
import slugify from 'slugify';

import Button from './components/ui/button';
import Chart from './components/chart';
import Input from './components/ui/input';
import Select from './components/ui/select';
import Textarea from './components/ui/textarea';

import './style.css';

const onSubmit = (form, setData) => {
  const formData = new FormData(form);
  const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  setData(data);
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

export default () => {
  const form = useRef(null);
  const [dataset, setData] = useState(null);
  const parsedData = parseData(dataset && dataset.data);
  const isComplete = dataset && dataset.truncateAt;
  let snipped;

  if (isComplete) {
    snipped = `
<div class="media media-element-container media-default">
  <div class="js-chart--you-draw-it" data-chart-name="${parseName(dataset.name)}" data-chart-data='${JSON.stringify(parsedData)}' data-chart-button-label="${dataset.buttonLabel}" data-chart-truncate="${dataset.truncateAt}"></div>
  <p>${dataset.reveal}</p>
</div>
    `;
  }

  return (
    <div className="app">
      <form ref={form} onSubmit={event => {
        event.preventDefault();
        onSubmit(form.current, setData);
      }}>
        <h1 className="title">Draw me! Generator</h1>

        <Input name="name" label="Name of the dataset" required />
        <Textarea name="data" label="Data" rows={10} monospace required />
        <Input name="unitY" label="Unit (y axis)" required />
        <Textarea name="reveal" label="Text to reveal" rows={5} required />
        <Input name="buttonLabel" label="Button label" required />

        {dataset && (
          <Select name="truncateAt" required label="Truncate chart at">
            {Object.entries(parsedData).map(([value]) => (
              <option value={value}>{value}</option>
            ))}
          </Select>
        )}

        <Button type="submit">Generate Snippet</Button>

        <div>
          {isComplete && (
            <>
              <h2>Preview</h2>

              <Chart data={parsedData} name={parseName(dataset.name)} medianYear={dataset.truncateAt} />

              <h2>Prepare the article</h2>
              <p>Add the following snippet at the beginning of your article</p>

              <pre>
                {`
  <script src="/sites/all/libraries/d3/d3.min.js"></script>
  <style type="text/css">.some-style {}</style>
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
          )}
        </div>
      </form>
    </div>
  );
}
