import React, { useState } from 'react';
import Get_file from '../components/paid_page/Get_file';
import {MainLayout} from '../components/layout/MainLayout';
import styled from 'styled-components';

const Paid_Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [scanType, setScanType] = useState<'single' | 'directory' | 'git' | null>(null);

  return (
    <MainLayout>
      <StyledWrapper>
        <Get_file
          file={file}
          setFile={setFile}
          scanType={scanType}
          setScanType={setScanType}
        />
      </StyledWrapper>
    </MainLayout>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #000000;
  padding: 30px;
`;

export default Paid_Page;