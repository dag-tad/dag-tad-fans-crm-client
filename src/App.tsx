import React, { ReactNode, useEffect } from 'react';
import { Layout } from 'antd'
import { Route, RouteObject, Routes } from 'react-router-dom';

import routes from './pages/routes';
import { AuthContextValue, useAuth } from './stores/AuthProvider';
import FansCrmHeader from './components/FansCrmHeader';
const { Header, Content } = Layout;

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: 'calc(100vh - 64px)',
  borderRadius: 8,
  overflow: 'hidden',
  marginTop: 15
};
function App() {
  const { userData, signout, getCurrentUser } = useAuth() as AuthContextValue;

  useEffect(() => {
    getCurrentUser();
  }, []);

  const renderWithLayout = (element: ReactNode): ReactNode => {
    return (
      <Layout>
        <FansCrmHeader name={userData?.name || ''} signout={signout} backgroundColor='#fff' textColor='#000'/>
        <Layout style={layoutStyle}>
          {element}
        </Layout>
      </Layout>
    )
  }

  const renderRoute = (route: RouteObject) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={renderWithLayout(route.element)}
      />
    )
  }
  return (
    <Routes>
      {routes.map(route => renderRoute(route))}
    </Routes>
  );
}

export default App;
