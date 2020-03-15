import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';

import { Map, MenuBar } from './components';
import { getConfig } from './conifg';
import { InvestmentsResponse, InvestorsResponse, MapTypes } from './types';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<InvestmentsResponse | InvestorsResponse | null>(null);
  const [title, setTitle] = useState('Loading...');
  const [type, setType] = useState(MapTypes.Investors);
  const [isBackArrowVisible, setIsBackArrowVisible] = useState(false);

  const config = getConfig();

  const fetchInvestors = async (): Promise<InvestorsResponse> => {
    const response = await fetch(`${config.api.url}/investors`);
    return response.json();
  };

  const fetchInvestments = async (name: string): Promise<InvestmentsResponse> => {
    const response = await fetch(`${config.api.url}/investors/${name}/investments`);
    return response.json();
  };

  useEffect(() => {
    fetchInvestors()
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
};
