import { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface ScanDastProps {
  url: string; // Scan URL
  setUrl: React.Dispatch<React.SetStateAction<string>>; // URL update function
  isScanning: boolean; // Scanning state
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>; // Scanning state update function
  outputFormat: 'markdown' | 'html' | 'json' | null; // Output format
  setOutputFormat: React.Dispatch<React.SetStateAction<'markdown' | 'html' | 'json' | null>>; // Format update function
}

const ScanDast: React.FC<ScanDastProps> = ({
  url,
  setUrl,
  isScanning,
  setIsScanning,
  outputFormat,
  setOutputFormat,
}) => {
  const [scanResult, setScanResult] = useState<string>(''); // Scan result
  const [showFormatSelection, setShowFormatSelection] = useState(false); // Show format options

  const handleScan = () => {
    if (!url) {
      setScanResult('**Error**: Please enter a URL first.');
      return;
    }
    console.log('Starting URL scan:', url); // For debugging
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowFormatSelection(true); // Show format options
    }, 2000);
  };

  const handleFormatSelect = (format: 'markdown' | 'html' | 'json') => {
    console.log('Selected output format:', format); // For debugging
    setOutputFormat(format);
    setShowFormatSelection(false);

    const result = {
      url,
      status: 'Secure',
      threatsDetected: 'None',
      scanDate: new Date().toLocaleString(),
      recommendations: [
        'Ensure your security software is up to date.',
        'Avoid visiting untrusted websites.',
      ],
    };

    if (format === 'markdown') {
      setScanResult(`
# URL Scan Report
**URL**: ${result.url}
**Status**: ${result.status}
**Threats Detected**: ${result.threatsDetected}
**Scan Date**: ${result.scanDate}

## Recommendations
${result.recommendations.map((rec) => `- ${rec}`).join('\n')}
      `);
    } else if (format === 'html') {
      setScanResult(`
<div style="font-family: Arial, sans-serif; color: #fff; background: rgba(0, 0, 0, 0.7); padding: 15px; border-radius: 12px;">
  <h1>URL Scan Report</h1>
  <p><strong>URL:</strong> ${result.url}</p>
  <p><strong>Status:</strong> ${result.status}</p>
  <p><strong>Threats Detected:</strong> ${result.threatsDetected}</p>
  <p><strong>Scan Date:</strong> ${result.scanDate}</p>
  <h2>Recommendations</h2>
  <ul>
    ${result.recommendations.map((rec) => `<li>${rec}</li>`).join('')}
  </ul>
</div>
      `);
    } else if (format === 'json') {
      setScanResult(JSON.stringify(result, null, 2));
    }
  };

  return (
    <StyledWrapper>
      <div className="input-wrapper">
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="inbox">
              <rect width={24} height={24} transform="rotate(180 12 12)" opacity={0} />
              <path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z" />
            </g>
          </g>
        </svg>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter target URL (e.g., https://example.com)"
          className="input"
          required
          disabled={isScanning}
        />
        <button
          className="scan-btn"
          type="submit"
          disabled={isScanning}
          onClick={handleScan}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={30} height={10} viewBox="0 0 38 15" className="arrow">
            <path d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.150-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.150-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.010.013-.010.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z" />
          </svg>
          Scan
        </button>
      </div>

      {showFormatSelection && (
        <div className="format-selection">
          <h3 className="format-title">Select Output Format</h3>
          <div className="format-buttons">
            <button
              className="format-button"
              onClick={() => handleFormatSelect('markdown')}
            >
              Markdown
            </button>
            <button
              className="format-button"
              onClick={() => handleFormatSelect('html')}
            >
              HTML
            </button>
            <button
              className="format-button"
              onClick={() => handleFormatSelect('json')}
            >
              JSON
            </button>
          </div>
        </div>
      )}

      {scanResult && outputFormat && (
        <div className="result">
          <h3 className="result-title">Scan Result</h3>
          {outputFormat === 'markdown' && <ReactMarkdown>{scanResult}</ReactMarkdown>}
          {outputFormat === 'html' && (
            <div dangerouslySetInnerHTML={{ __html: scanResult }} />
          )}
          {outputFormat === 'json' && <pre>{scanResult}</pre>}
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-wrapper {
    width: fit-content;
    height: 45px;
    border-radius: 20px;
    padding: 5px;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    background-color: #292524;
    margin: auto;
  }

  .icon {
    width: 30px;
    fill: rgb(255, 255, 255);
    margin-left: 8px;
    margin-right: 8px;
    transition: all 0.3s;
  }

  .input {
    max-width: 500px;
    min-width: 400px;
    height: 100%;
    border: none;
    outline: none;
    background-color: #292524;
    color: white;
    font-size: 1em;
  }

  .input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #292524 inset;
    -webkit-text-fill-color: #ffffff;
  }

  .scan-btn {
    height: 100%;
    width: 95px;
    border: none;
    border-radius: 15px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    background-color: #ffffff;
    font-weight: 500;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s;
  }

  .arrow {
    position: absolute;
    margin-right: 150px;
    transition: all 0.3s;
  }

  .input-wrapper:active .icon {
    transform: scale(1.3);
  }

  .scan-btn:hover {
    color: white;
  }

  .scan-btn:hover .arrow {
    margin-right: 0;
    animation: jello-vertical 0.9s both;
    transform-origin: right;
  }

  @keyframes jello-vertical {
    0% {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(0.75, 1.25, 1);
    }
    40% {
      transform: scale3d(1.25, 0.75, 1);
    }
    50% {
      transform: scale3d(0.85, 1.15, 1);
    }
    65% {
      transform: scale3d(1.05, 0.95, 1);
    }
    75% {
      transform: scale3d(0.95, 1.05, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  .scan-btn:active {
    transform: scale(0.9);
  }

  .format-selection {
    margin-top: 20px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 15px;
    border-radius: 10px;
  }

  .format-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 255, 157, 0.8);
    margin-bottom: 15px;
  }

  .format-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .format-button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(90deg, #00c6ff, #00ff9d);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 198, 255, 0.7);
  }

  .format-button:hover {
    background: linear-gradient(90deg, #00ff9d, #00c6ff);
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.9);
  }

  .result {
    margin-top: 20px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.6);
    color: #fff;
    white-space: pre-wrap;
  }

  .result-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #00ff9d;
    margin-bottom: 10px;
  }

  pre {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
  }
`;

export default ScanDast;