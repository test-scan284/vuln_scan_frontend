/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUpload, FaSearch, FaTimes, FaEnvelope, FaDownload } from 'react-icons/fa';

interface GetFileProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  scanType: 'single' | 'directory' | 'git' | null;
  setScanType: React.Dispatch<React.SetStateAction<'single' | 'directory' | 'git' | null>>;
}

type Step = 'selectScanType' | 'selectFormat' | 'enterEmail' | 'runScan';

const Get_file: React.FC<GetFileProps> = ({ file, setFile, scanType, setScanType }) => {
  const [fileName, setFileName] = useState('No file selected');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>('');
  const [resultFileName, setResultFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('selectScanType');
  const [outputFormat, setOutputFormat] = useState<'markdown' | 'html' | 'json' | null>(null);
  const [email, setEmail] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      setFileName(file.name);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
      setErrorMessage('');
    } else {
      setFileName('No file selected');
      setFilePreview(null);
      setScanResult('');
      setResultFileName('');
      setErrorMessage('');
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) {
      setErrorMessage('Failed to select file. Please try again.');
      return;
    }
    setFile(selected);
    setScanResult('');
    setResultFileName('');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    setFile(null);
    setScanType(null);
    setOutputFormat(null);
    setEmail('');
    setCurrentStep('selectScanType');
    setScanResult('');
    setResultFileName('');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = async () => {
    setErrorMessage('');

    if (currentStep === 'selectScanType') {
      if (!scanType) {
        setErrorMessage('Please select a scan type.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/sast-paid/set-scan-type', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scanType }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to set scan type: ${errorText || response.statusText}`);
        }
        setCurrentStep('selectFormat');
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        setErrorMessage(message);
      }
    } else if (currentStep === 'selectFormat') {
      if (!outputFormat) {
        setErrorMessage('Please select an output format.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/sast-paid/set-output-format', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ format: outputFormat }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to set output format: ${errorText || response.statusText}`);
        }
        setCurrentStep('enterEmail');
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        setErrorMessage(message);
      }
    } else if (currentStep === 'enterEmail') {
      try {
        const response = await fetch('http://localhost:3000/sast-paid/set-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email || null }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to set email: ${errorText || response.statusText}`);
        }
        setCurrentStep('runScan');
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        setErrorMessage(message);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'selectFormat') {
      setCurrentStep('selectScanType');
    } else if (currentStep === 'enterEmail') {
      setCurrentStep('selectFormat');
    } else if (currentStep === 'runScan') {
      setCurrentStep('enterEmail');
    }
    setErrorMessage('');
  };

  const handleScan = async () => {
    if (!file || scanning) {
      setErrorMessage('Please select a file first.');
      return;
    }
    setScanning(true);
    setErrorMessage('');

    try {
      // 1. Upload the file
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('http://localhost:3000/sast-paid/upload-file', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        let errorText;
        try {
          errorText = await uploadResponse.json();
          throw new Error(`Upload failed: ${errorText.message || uploadResponse.statusText}`);
        } catch {
          errorText = await uploadResponse.text();
          throw new Error(`Upload failed: ${errorText || uploadResponse.statusText}`);
        }
      }

      let uploadData;
      try {
        uploadData = await uploadResponse.json();
      } catch (e) {
        setErrorMessage('Invalid upload response format: Expected JSON');
        setScanning(false);
        return;
      }
      console.log('Upload response:', uploadData);

      const { filePath } = uploadData;
      if (!filePath) {
        setErrorMessage('Upload failed: No file path returned from server');
        setScanning(false);
        return;
      }

      // 2. Set scan path
      const scanPathResponse = await fetch('http://localhost:3000/sast-paid/set-scan-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scanPath: filePath }),
      });

      if (!scanPathResponse.ok) {
        let errorText;
        try {
          errorText = await scanPathResponse.json();
          setErrorMessage(`Scan path setup failed: ${errorText.message || scanPathResponse.statusText}`);
        } catch {
          errorText = await scanPathResponse.text();
          setErrorMessage(`Scan path setup failed: ${errorText || scanPathResponse.statusText}`);
        }
        setScanning(false);
        return;
      }

      let pathData;
      try {
        pathData = await scanPathResponse.json();
      } catch (e) {
        setErrorMessage('Invalid scan path response format: Expected JSON');
        setScanning(false);
        return;
      }
      console.log('Scan path response:', pathData);

      // 3. Run the scan
      const runScanResponse = await fetch('http://localhost:3000/sast-paid/run-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!runScanResponse.ok) {
        let errorText;
        try {
          errorText = await runScanResponse.json();
          setErrorMessage(`Scan execution failed: ${errorText.message || runScanResponse.statusText}`);
        } catch {
          errorText = await runScanResponse.text();
          setErrorMessage(`Scan execution failed: ${errorText || runScanResponse.statusText}`);
        }
        setScanning(false);
        return;
      }

      let scanData;
      try {
        scanData = await runScanResponse.json();
      } catch (e) {
        setErrorMessage('Invalid scan response format: Expected JSON');
        setScanning(false);
        return;
      }

      console.log('Run scan response:', scanData);

      // 4. Store fileName for download
      if (scanData.fileName) {
        setScanResult('success'); // Flag to indicate scan completed
        setResultFileName(scanData.fileName);
      } else {
        setErrorMessage('Invalid scan response: No fileName found');
        setScanning(false);
        return;
      }

      setErrorMessage('');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      setErrorMessage(`Error: ${message}`);
      console.error('Error during file scan:', error);
    } finally {
      setScanning(false);
    }
  };

  const handleDownload = () => {
    if (resultFileName) {
      window.location.href = `http://localhost:3000/sast-paid/download/${encodeURIComponent(resultFileName)}`;
    } else {
      setErrorMessage('No result file available for download');
    }
  };

  const handleFormatSelect = (format: 'markdown' | 'html' | 'json') => {
    console.log('Selected output format:', format);
    setOutputFormat(format);
    setErrorMessage('');
  };

  return (
    <StyledWrapper>
      <div className="sast-section">
        <h1 className="sast-title">Static File Security Testing (SAST)</h1>
      </div>
      <div className="intro-text">
        <h2 className="intro-heading">File Scanner</h2>
      </div>

      <div className="container">
        {currentStep === 'selectScanType' && (
          <div className="step">
            <h3 className="step-title">Select Scan Type</h3>
            <div className="format-buttons">
              <button
                className={`format-button ${scanType === 'single' ? 'selected' : ''}`}
                onClick={() => setScanType('single')}
              >
                Single File
              </button>
              <button
                className={`format-button ${scanType === 'directory' ? 'selected' : ''}`}
                onClick={() => setScanType('directory')}
              >
                Directory
              </button>
              <button
                className={`format-button ${scanType === 'git' ? 'selected' : ''}`}
                onClick={() => setScanType('git')}
              >
                Git Repository
              </button>
            </div>
          </div>
        )}

        {currentStep === 'selectFormat' && (
          <div className="step">
            <h3 className="step-title">Select Output Format</h3>
            <div className="format-buttons">
              <button
                className={`format-button ${outputFormat === 'markdown' ? 'selected' : ''}`}
                onClick={() => handleFormatSelect('markdown')}
              >
                Markdown
              </button>
              <button
                className={`format-button ${outputFormat === 'html' ? 'selected' : ''}`}
                onClick={() => handleFormatSelect('html')}
              >
                HTML
              </button>
              <button
                className={`format-button ${outputFormat === 'json' ? 'selected' : ''}`}
                onClick={() => handleFormatSelect('json')}
              >
                JSON
              </button>
            </div>
          </div>
        )}

        {currentStep === 'enterEmail' && (
          <div className="step">
            <h3 className="step-title">Enter Email (Optional)</h3>
            <div className="email-input">
              <FaEnvelope className="email-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        {currentStep === 'runScan' && (
          <div className="step">
            <h3 className="step-title">Run Scan</h3>
            {scanType === 'single' && (
              <>
                <label htmlFor="file" className="file-label">
                  <FaUpload className="upload-icon" />
                  <p>{fileName}</p>
                </label>
                <input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </>
            )}
            {scanType === 'directory' && (
              <>
                <label htmlFor="file" className="file-label">
                  <FaUpload className="upload-icon" />
                  <p>{fileName}</p>
                </label>
                <input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  {...({ webkitdirectory: true } as any)}
                />
              </>
            )}
            {scanType === 'git' && (
              <div className="email-input">
                <FaUpload className="email-icon" />
                <input
                  type="text"
                  placeholder="Enter Git repository URL"
                  value={fileName}
                  onChange={(e) => {
                    setFileName(e.target.value);
                    setFile(null);
                  }}
                />
              </div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="button-group">
          {currentStep !== 'selectScanType' && (
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep !== 'runScan' && (
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          )}
          {currentStep === 'runScan' && (
            <button className="scan-button" onClick={handleScan} disabled={!file || scanning}>
              <FaSearch className="button-icon" />
              Scan
            </button>
          )}
          {(file || scanResult) && (
            <button className="reset-button" onClick={handleReset}>
              <FaTimes className="button-icon" />
              Reset
            </button>
          )}
        </div>

        {filePreview && currentStep === 'runScan' && (
          <div className="preview">
            <img src={filePreview} alt="File preview" className="image" />
          </div>
        )}

        {!filePreview && fileName !== 'No file selected' && currentStep === 'runScan' && (
          <div className="file-icon">
            <FaUpload className="file-icon-large" />
            <p>Uploaded file: {fileName}</p>
          </div>
        )}

        {scanResult && (
          <div className="result">
            <h3 className="result-title">Scan Successful!</h3>
            <div className="button-container">
              <button className="download-button" onClick={handleDownload}>
                <FaDownload className="button-icon" />
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) rotate(2deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(0, 198, 255, 0.5), 0 0 20px rgba(0, 255, 157, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 198, 255, 0.8), 0 0 30px rgba(0, 255, 157, 0.8);
  }
  100% {
    box-shadow: 0 0 10px rgba(0, 198, 255, 0.5), 0 0 20px rgba(0, 255, 157, 0.5);
  }
`;

const borderPulse = keyframes`
  0% {
    border-color: rgba(0, 198, 255, 0.5);
  }
  50% {
    border-color: rgba(0, 198, 255, 1);
  }
  100% {
    border-color: rgba(0, 198, 255, 0.5);
  }
`;

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 198, 255, 1);
  }
  100% {
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.7);
  }
`;

const StyledWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  max-width: 700px;
  margin: auto;
  padding: 30px;

  .sast-section {
    text-align: center;
    margin-bottom: 40px;
    color: #ffffff;
    animation: ${fadeIn} 0.5s ease-out;
  }

  .sast-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #00ff9d;
    text-shadow: 0 0 15px rgba(0, 255, 157, 0.8);
    margin-bottom: 15px;
    white-space: nowrap;
  }

  .intro-text {
    text-align: center;
    margin-bottom: 40px;
    color: #fff;
    text-shadow: 0 0 15px rgba(0, 255, 157, 0.8);
    animation: ${fadeIn} 0.5s ease-out;
  }

  .intro-heading {
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    color: #00ff9d;
    text-shadow: 0 0 10px rgba(0, 255, 157, 0.8);
    margin-bottom: 25px;
  }

  .container {
    width: 100%;
    padding: 30px;
    background: #0a0a0a;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 245, 255, 0.2), 0 0 40px rgba(0, 255, 157, 0.2);
    animation: ${pulse} 2s infinite;
    display: flex;
    flex-direction: column;
    gap: 25px;
    color: #fff;
    position: relative;
  }

  .step {
    text-align: center;
  }

  .step-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #00ff9d;
    text-shadow: 0 0 10px rgba(0, 255, 157, 0.8);
    margin-bottom: 20px;
  }

  .file-label {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 18px;
    color: #00ff9d;
    box-shadow: 0 0 15px rgba(0, 255, 157, 0.3);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 100%;
  }

  .file-label:hover {
    background: rgba(0, 0, 0, 1);
    box-shadow: 0 0 20px rgba(0, 255, 157, 0.5);
    transform: scale(1.02);
  }

  input[type='file'] {
    display: none;
  }

  .upload-icon {
    font-size: 24px;
    color: #00ff9d;
  }

  .error-message {
    background: rgba(255, 59, 59, 0.2);
    padding: 12px;
    border-radius: 8px;
    color: #ff6b6b;
    text-align: center;
    font-size: 1.1rem;
  }

  .button-group {
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  .scan-button,
  .reset-button,
  .next-button,
  .back-button,
  .download-button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 25px;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.5s ease-out;
  }

  .scan-button {
    background: linear-gradient(90deg, #00c6ff, #00ff9d);
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.4);
  }

  .scan-button:hover {
    background: linear-gradient(90deg, #00ff9d, #00c6ff);
    box-shadow: 0 0 20px rgba(0, 198, 255, 0.7);
    transform: scale(1.05);
  }

  .scan-button:disabled {
    background: rgba(0, 198, 255, 0.3);
    cursor: not-allowed;
    box-shadow: none;
  }

  .reset-button {
    background: linear-gradient(90deg, #ff3b3b, #ff6b6b);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.4);
  }

  .reset-button:hover {
    background: linear-gradient(90deg, #ff6b6b, #ff3b3b);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
    transform: scale(1.05);
  }

  .next-button {
    background: linear-gradient(90deg, #00c6ff, #00ff9d);
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.4);
  }

  .next-button:hover {
    background: linear-gradient(90deg, #00ff9d, #00c6ff);
    box-shadow: 0 0 20px rgba(0, 198, 255, 0.7);
    transform: scale(1.05);
  }

  .back-button {
    background: linear-gradient(90deg, #1a1a1a, #4b4b4b);
    box-shadow: 0 0 15px rgba(200, 200, 200, 0.4);
  }

  .back-button:hover {
    background: linear-gradient(90deg, #4b4b4b, #1a1a1a);
    box-shadow: 0 0 20px rgba(200, 200, 200, 0.7);
    transform: scale(1.05);
  }

  .download-button {
    background: linear-gradient(90deg, #00c6ff, #007bff);
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.4);
  }

  .download-button:hover {
    background: linear-gradient(90deg, #007bff, #00c6ff);
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
    transform: scale(1.05);
  }

  .button-icon {
    font-size: 20px;
    color: #fff;
  }

  .format-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .format-button {
    padding: 12px 25px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(90deg, #00c6ff, #00ff9d);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 198, 255, 0.3);
    animation: ${fadeIn} 0.5s ease-out;
  }

  .format-button:hover {
    background: linear-gradient(90deg, #00ff9d, #00c6ff);
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.6);
    transform: scale(1.05);
  }

  .format-button.selected {
    background: linear-gradient(90deg, #00c6ff, #00ff9d);
    box-shadow: 0 0 25px rgba(0, 198, 255, 0.9);
    animation: ${glowPulse} 1.5s infinite;
    transform: scale(1.1);
    border: 2px solid #00c6ff;
    animation: ${borderPulse} 1.5s infinite;
    text-shadow: 0 0 8px rgba(0, 198, 255, 1);
  }

  .email-input {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 12px;
    font-size: 18px;
    color: #00ff9d;
    box-shadow: 0 0 15px rgba(0, 255, 157, 0.3);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 100%;
  }

  .email-input input {
    flex: 1;
    background: transparent;
    border: none;
    color: #00ff9d;
    font-size: 18px;
    outline: none;
  }

  .email-input input::placeholder {
    color: rgba(0, 255, 157, 0.5);
  }

  .email-icon {
    font-size: 24px;
    color: #00ff9d;
  }

  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    animation: ${fadeIn} 0.5s ease-out;
  }

  .image {
    max-width: 100%;
    max-height: 300px;
    border-radius: 12px;
    border: 5px solid #00c6ff;
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.3);
  }

  .file-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    font-size: 20px;
    color: #fff;
  }

  .file-icon-large {
    font-size: 50px;
    color: #00ff9d;
  }

  .result {
    margin-top: 25px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 255, 157, 0.3);
    color: #fff;
    text-align: center;
  }

  .result-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #00ff9d;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(0, 255, 157, 0.8);
  }

  .button-container {
    display: flex;
    justify-content: center;
  }
`;

export default Get_file;