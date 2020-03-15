import { CssBaseline } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { Map, MenuBar } from './components';
import { getConfig } from './conifg';
import { InvestmentsResponse, InvestorsResponse, LayerTypes } from './types';

const LOADING_TITLE = 'Loading...';
const ERROR_TITLE = 'Oops, something went wrong...';

interface AppState {
  layerType: LayerTypes;
  investmentsData: InvestmentsResponse | null;
  investorsData: InvestorsResponse | null;
  title: string;
}

export const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    layerType: LayerTypes.Investors,
    investmentsData: null,
    investorsData: null,
    title: 'Loading...',
  });

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
    fetch(`${getConfig().api.url}/investors`)
      .then(response => response.json())
      .then(data => {
        setState(s => ({
          ...s,
          investorsData: data,
          title: `Investors - ${data?.investors?.length}`,
        }));
      })
      .catch(err => {
        console.error(err);
        setState(s => ({
          ...s,
          title: ERROR_TITLE,
        }));
      });
  }, []);

  const handleInvestorClick = async (name: string) => {
    setState(s => ({
      ...s,
      layerType: LayerTypes.Investments,
      investmentsData: null,
      title: LOADING_TITLE,
    }));
    try {
      const data = (await fetchInvestments(name)) as InvestmentsResponse;
      setState(s => ({
        ...s,
        investmentsData: data,
        title: `${name} - ${data.investments.length} investments`,
      }));
    } catch (err) {
      console.error(err);
      setState(s => ({
        ...s,
        layerType: LayerTypes.Investors,
        investmentsData: null,
        title: ERROR_TITLE,
      }));
    }
  };

  const handleBackButtonClick = async () => {
    setState(s => ({
      ...s,
      layerType: LayerTypes.Investors,
      title: LOADING_TITLE,
    }));
    try {
      const data = await fetchInvestors();
      setState(s => ({
        ...s,
        investorsData: data,
        title: `Investors - ${data?.investors?.length}`,
      }));
    } catch (err) {
      console.error(err);
      setState(s => ({
        ...s,
        title: ERROR_TITLE,
      }));
    }
  };

  return (
    <>
      <CssBaseline />
      <MenuBar
        title={state.title}
        isBackArrowVisible={state.layerType === LayerTypes.Investments}
        handleBackButtonClick={handleBackButtonClick}
      />
      <Map
        layerType={state.layerType}
        investmentsData={state.investmentsData}
        investorsData={state.investorsData}
        handleInvestorClick={handleInvestorClick}
      />
    </>
  );
};
