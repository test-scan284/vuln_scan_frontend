/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { FaUpload, FaSearch, FaTimes, FaDownload } from 'react-icons/fa';
import axios from 'axios';

interface GetFileProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const Get_file: React.FC<GetFileProps> = ({ file, setFile }) => {
  const [fileName, setFileName] = useState('No file selected');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFilePathSet, setIsFilePathSet] = useState(false);
  const [resultFileName, setResultFileName] = useState<string | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');

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
    } else {
      setFileName('No file selected');
      setFilePreview(null);
      setScanResult('');
      setIsFilePathSet(false);
      setResultFileName(null);
      setMarkdownContent('');
    }
  }, [file]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) {
      setScanResult('**Error**: File selection failed. Please try again.');
      setIsFilePathSet(false);
      return;
    }
    console.log('Uploading file:', selected.name);
    setFile(selected);
    setScanResult('');
    setIsFilePathSet(false);
    setResultFileName(null);
    setMarkdownContent('');

    try {
      const formData = new FormData();
      formData.append('file', selected);
      const uploadResponse = await axios.post('http://127.0.0.1:3000/sast/upload-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload response:', uploadResponse.data);
      const filePath = uploadResponse.data.filePath;
      await axios.post('http://127.0.0.1:3000/sast/set-file-path', { filePath });
      setScanResult('**Success**: File uploaded and path set successfully.');
      setIsFilePathSet(true);
    } catch (error: any) {
      console.error('File upload error:', error);
      setScanResult(`**Error**: Failed to upload or set file path. ${error.response?.data?.message || 'Make sure the server is running.'}`);
      setIsFilePathSet(false);
    }
  };

  const handleReset = () => {
    console.log('Resetting state');
    setFile(null);
    setScanResult('');
    setFileName('No file selected');
    setIsFilePathSet(false);
    setResultFileName(null);
    setMarkdownContent('');
  };

  const handleScan = async () => {
    if (!file || !isFilePathSet) {
      setScanResult('**Error**: Please select a file and ensure the path is set.');
      return;
    }

    setIsLoading(true);
    setScanResult('');
    setMarkdownContent('');
    setResultFileName(null);
    try {
      console.log('Sending /sast/run request for file:', file.name);
      const runResponse = await axios.post('http://127.0.0.1:3000/sast/run', {
        scanType: '1',
      });
      console.log('Run response:', runResponse.data);
      const { fileName } = runResponse.data;
      setResultFileName(fileName);

      console.log(`Fetching result file: ${fileName}`);
      const response = await axios.get(`http://127.0.0.1:3000/sast/download-text/${fileName}?t=${Date.now()}`, {
        responseType: 'text',
      });
      console.log('Download response:', response.data);
      setMarkdownContent(response.data);
      setScanResult(`**Scan Result**: The result file "${fileName}" has been created. Full analysis below.`);
    } catch (error: any) {
      console.error('Scan error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
      });
      setScanResult(`**Error**: Failed to run scan or fetch results. ${error.response?.data?.message || error.message || 'Make sure the server is running.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resultFileName) {
      setScanResult('**Error**: No result file available to download.');
      return;
    }

    try {
      console.log(`Downloading file: ${resultFileName}`);
      const response = await axios.get(`http://127.0.0.1:3000/sast/download/${resultFileName}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resultFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setScanResult(`**Success**: Result file "${resultFileName}" downloaded successfully.`);
    } catch (error: any) {
      console.error('Download error:', error);
      setScanResult(`**Error**: Failed to download result file. ${error.message}`);
    }
  };

  return (
    <StyledWrapper>
      <div className="intro-text">
        <h2 className="intro-heading">File Scanner</h2>
      </div>
      <div className="container">
        <label htmlFor="file" className="file-label">
          <FaUpload className="upload-icon" />
          <p>{fileName}</p>
        </label>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
        />
        <div className="button-group">
          <button
            className="scan-button"
            onClick={handleScan}
            disabled={!file || !isFilePathSet || isLoading}
          >
            <FaSearch className="button-icon" />
            {isLoading ? 'Scanning...' : 'Scan'}
          </button>
          {file && (
            <button
              className="reset-button"
              onClick={handleReset}
              disabled={isLoading}
            >
              <FaTimes className="button-icon" />
              Reset
            </button>
          )}
          {resultFileName && (
            <button
              className="download-button"
              onClick={handleDownload}
              disabled={isLoading}
            >
              <FaDownload className="button-icon" />
              Download Result
            </button>
          )}
        </div>
        {filePreview && (
          <div className="preview">
            <img src={filePreview} alt="File Preview" className="image" />
          </div>
        )}
        {!filePreview && fileName !== 'No file selected' && (
          <div className="file-icon">
            <FaUpload className="file-icon-large" />
            <p>File Uploaded: {fileName}</p>
          </div>
        )}
        {scanResult && (
          <div className="result">
            <ReactMarkdown>{scanResult}</ReactMarkdown>
          </div>
        )}
        {markdownContent && (
          <div className="summary">
            <h3 className="summary-title">Scan Results</h3>
            <div className="summary-content">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

const StyledWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  max-width: 800px;
  margin: auto;

  .intro-text {
    text-align: center;
    margin-bottom: 30px;
    color: #fff;
    text-shadow: 0 0 15px rgba(0, 255, 157, 0.8);
    animation: ${fadeIn} 0.5s ease-out;
  }

  .intro-heading {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #00ff9d;
    text-shadow: 0 0 10px rgba(0, 255, 157, 0.8);
    margin-bottom: 20px;
  }

  .container {
    width: 100%;
    padding: 25px;
    background: linear-gradient(135deg, #1e3a8a, #10b981);
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 245, 255, 0.6), 0 0 40px rgba(0, 255, 157, 0.6);
    animation: ${pulse} 2s infinite;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: #fff;
    position: relative;
  }

  .file-label {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0, 0, 0, 0.7);
    padding: 15px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    color: #00ff9d;
    box-shadow: 0 0 15px rgba(0, 255, 157, 0.6);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 100%;
  }

  .file-label:hover {
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0 0 20px rgba(0, 255, 157, 0.8);
    transform: scale(1.02);
  }

  input[type='file'] {
    display: none;
  }

  .upload-icon {
    font-size: 20px;
  }

  .button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .scan-button,
  .reset-button,
  .download-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .scan-button {
    background: linear-gradient(90deg, #00c6ff, #00ff9d);
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.7);
  }

  .scan-button:hover {
    background: linear-gradient(90deg, #00ff9d, #00c6ff);
    box-shadow: 0 0 20px rgba(0, 198, 255, 0.9);
    transform: scale(1.05);
  }

  .scan-button:disabled {
    background: rgba(0, 198, 255, 0.3);
    cursor: not-allowed;
    box-shadow: none;
  }

  .reset-button {
    background: linear-gradient(90deg, #ff3b3b, #ff6b6b);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
  }

  .reset-button:hover {
    background: linear-gradient(90deg, #ff6b6b, #ff3b3b);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.9);
    transform: scale(1.05);
  }

  .download-button {
    background: linear-gradient(90deg, #4b6cb7, #182848);
    box-shadow: 0 0 15px rgba(75, 108, 183, 0.7);
  }

  .download-button:hover {
    background: linear-gradient(90deg, #182848, #4b6cb7);
    box-shadow: 0 0 20px rgba(75, 108, 183, 0.9);
    transform: scale(1.05);
  }

  .button-icon {
    font-size: 18px;
  }

  .preview {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
    animation: ${fadeIn} 0.5s ease-out;
  }

  .image {
    max-width: 100%;
    max-height: 250px;
    border-radius: 10px;
    border: 5px solid #00c6ff;
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.6);
  }

  .file-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    font-size: 18px;
    color: #fff;
  }

  .file-icon-large {
    font-size: 35px;
    color: #00ff9d;
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

  .summary {
    margin-top: 20px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 198, 255, 0.6);
    color: #fff;
  }

  .summary-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #00ff9d;
    margin-bottom: 15px;
  }

  .summary-content {
    font-size: 1rem;
    line-height: 1.6;
    color: #ddd;

    h1, h2, h3, h4, h5, h6 {
      color: #00ff9d;
      margin-top: 1em;
      margin-bottom: 0.5em;
    }

    p {
      margin: 0.5em 0;
    }

    ul, ol {
      margin: 0.5em 0;
      padding-left: 20px;
    }

    code {
      background: #1e1e1e;
      padding: 2px 4px;
      border-radius: 4px;
      color: #ff79c6;
    }

    pre {
      background: #1e1e1e;
      padding: 10px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1em 0;
    }
  }
`;

export default Get_file;