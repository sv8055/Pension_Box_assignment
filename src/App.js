import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/authentication/authContextProvider'
import Layout from './component/layout';
import PageNotFound from './component/common/404';
const Login = lazy(() => import('./pages/Login'));
const Orders = lazy(() => import( './pages/Orders'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute/ProtectedRoute'))
function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <Layout>
            <Suspense fallback={<div className='ErrorMessage'>Loading...</div>}>
              <Switch>
                <ProtectedRoute path="/orders" component={Orders} />
                <Route exact path="/" component={Login} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Suspense>
          </Layout>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
