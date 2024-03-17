import React, { ReactNode, useEffect } from 'react';
import { Button, Layout } from 'antd'
import { Link, Route, RouteObject, Routes, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const renderWithLayout = (element: ReactNode): ReactNode => {
    const _signout = () => {
      signout();
      navigate('/', {replace: true});
    }

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
