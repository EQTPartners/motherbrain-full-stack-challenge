import { CssBaseline } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { Map, MenuBar } from './components';
import { InvestmentsResponse, InvestorsResponse, MapTypes } from './types';

const fetchInvestors = async (): Promise<InvestorsResponse> => {
  const response = await fetch('http://localhost:8080/investors');
  return response.json();
};

const fetchInvestments = async (name: string): Promise<InvestmentsResponse> => {
  const response = await fetch(`http://localhost:8080/investors/${name}/investments`);
  return response.json();
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<InvestmentsResponse | InvestorsResponse | null>(null);
  const [title, setTitle] = useState('Investors');
  const [type, setType] = useState(MapTypes.Investors);
  const [isBackArrowVisible, setIsBackArrowVisible] = useState(false);

  useEffect(() => {
    const data = fetchInvestors()
      .then(data => {
        setData(data);
        setTitle(`Investors - ${data?.investors?.length}`);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleInvestorClick = async (name: string) => {
    setIsLoading(true);
    setTitle('Loading...');
    setData(null);
    setType(MapTypes.Investments);
    try {
      const data = (await fetchInvestments(name)) as InvestmentsResponse;
      setIsBackArrowVisible(true);
      setTitle(`${name} - ${data.investments.length} investments`);
      setData(data);
    } catch (err) {
      console.error(err);
      setIsBackArrowVisible(true);
      setTitle('Error :( try something else!');
    }
    setIsLoading(false);
  };

  const handleBackButtonClick = async () => {
    setIsLoading(true);
    setTitle('Loading...');
    setData(null);
    setIsBackArrowVisible(false);
    setType(MapTypes.Investors);
    try {
      const data = await fetchInvestors();
      setData(data);
      setTitle(`Investors - ${data?.investors?.length}`);
    } catch (err) {
      console.error(err);
      setTitle('Error :( try something else!');
    }
    setIsLoading(false);
  };

  return (
    <>
      <CssBaseline />
      <MenuBar
        title={title}
        isBackArrowVisible={isBackArrowVisible}
        handleBackButtonClick={handleBackButtonClick}
      />
      <Map type={type} data={data} handleInvestorClick={handleInvestorClick} />
    </>
  );
}

export default App;
