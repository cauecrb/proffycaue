import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from './pages/landing';
import ListaProf from './pages/ListaProf';
import FormProf from './pages/FormProf';

function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route  path="/estudar" component={ListaProf} />
            <Route  path="/give-classes" component={FormProf} />
        </BrowserRouter>
    )
}

export default Routes;