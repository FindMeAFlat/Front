import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './../Header';
import Steps from './../Steps';

function Router() {
    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <Steps />
            </div>
        </BrowserRouter>
    );
}

export default Router;
