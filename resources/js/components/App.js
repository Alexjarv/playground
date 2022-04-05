import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './AppRouter';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const App = () => {
    return (
          <BrowserRouter>
              <Sidebar/>
              <Navbar/>
              <AppRouter/>
          </BrowserRouter>
    );
}

export default App;


