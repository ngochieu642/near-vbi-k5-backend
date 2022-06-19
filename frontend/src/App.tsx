import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StakingPage from './pages/StakingPage';
import SwapPage from "~pages/SwapPage";
import MainLayout from "~components/layouts/MainLayout";
import FaucetPage from "~pages/FaucetPage";
import WrapNearPage from "~pages/WrapNearPage";
import HomePage from '~pages/HomePage';
import RequestPage from '~pages/RequestPage'
import CertificatesPage from '~pages/CertificatesPage'
import WelcomePage from '~components/Home/Welcome'

function App() {
  return (
    <Router>
        <MainLayout>
            <div className="relative pb-24 overflow-x-hidden xs:flex xs:flex-col md:flex md:flex-col">
                <Switch>
                    <Route path="/" exact component={AutoHeight(WelcomePage)} />
                    <Route path="/register" exact component={AutoHeight(HomePage)} />
                    <Route path="/requests" exact component={AutoHeight(RequestPage)} />
                    <Route path="/certificates" component={AutoHeight(CertificatesPage)} />
                    <Route path="/staking" component={AutoHeight(StakingPage)} />
                    <Route path="/faucet" component={AutoHeight(FaucetPage)} />
                    <Route path="/wrap-near" component={AutoHeight(WrapNearPage)} />
                </Switch>
            </div>
        </MainLayout>
    </Router>
  );
}

// decorate any components with this HOC to display them as vertical-align middle
// use individual fn is needed since `h-4/5` is not a appropriate style rule for
// any components
function AutoHeight(Comp: any) {
  return (props: any) => {
    return (
      <div className="xs:flex xs:flex-col md:flex md:flex-col justify-center h-4/5 lg:mt-12 relative xs:mt-8">
        <Comp {...props} />
      </div>
    );
  };
}

export default App;
