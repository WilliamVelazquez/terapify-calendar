import React from 'react';
import useToggle from '../hooks/useToggle';

import Layout from '../components/Layout';
import CubeLoader from '../components/CubeLoader';
import FilteredCalendar from '../containers/FilteredCalendar';

const App = () => {
  const [isLoading, toogleLoading, setIsLoading] = useToggle(false);
  return (
    <Layout>
      <FilteredCalendar setIsLoading={setIsLoading} />
      {isLoading && <CubeLoader />}
    </Layout>
  );
};

export default App;
