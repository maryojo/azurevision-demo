// ./src/App.js
import React, { useState } from 'react';
import { computerVision } from './components/AzureVisionService';

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const handleChange = (e) => {
    setFile(e.target.value)
  }
  const onFileUrlEntered = () => {

    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(file).then((item) => {

      // reset state/form
      setAnalysis(item);
      setFile("");
      setProcessing(false);
    });

  };

  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
  }

  const DisplayResults = () => {
    return (
      <div>
        <h2>Computer Vision Analysis</h2>
        <div><img src={analysis.URL} height="200" border="1" alt={(analysis.description && analysis.description.captions && analysis.description.captions[0].text ? analysis.description.captions[0].text : "can't find caption")} /></div>
        {PrettyPrintJson(analysis)}
      </div>
    )
  };
  
  //Describe image
  const Describe = () => {
    return (
    <div>
      <h1>Describe image</h1>
      {!processing &&
        <div>
          <div>
            <label>URL</label>
            <input type="text" placeholder="Enter image URL" size="50" onChange={handleChange}></input>
          <button onClick={onFileUrlEntered}>Describe</button>
          </div>
        </div>
      }
      {processing && <div>Processing...</div>}
      <hr />
      {analysis && DisplayResults()}
      </div>
    )
  }

  return (
    <div>
      <Describe/>
    </div>
    
  );
}

export default App;