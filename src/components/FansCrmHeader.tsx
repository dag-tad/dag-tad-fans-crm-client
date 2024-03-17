import { Header } from 'antd/es/layout/layout';
import React from 'react'
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';
import { AuthContextValue, useAuth } from '../stores/AuthProvider';
import { Button } from 'antd';
  
  interface IHeader {
    name: string,
    backgroundColor: string,
    textColor: string,
    signout: () => void
  }
function FansCrmHeader({name, signout, backgroundColor = 'white', textColor = 'black'}: IHeader) {
    const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: textColor,
        height: 80,
        lineHeight: '64px',
        backgroundColor: backgroundColor,
        borderBottom: '1px solid #F5F5F5'
      };
  return (
    <Header style={headerStyle}>
          <Link to="/" style={{marginTop: 20}}><Logo /></Link>
          <div style={{ display: 'flex', gap: 20 }}>
            {name && <div style={{display: 'flex', alignItems: 'center', gap: 10, color: textColor}}>
              <div>Welcome</div> {name}
              <Button type="primary" size='large' onClick={signout}>Signout</Button>
              </div>}
          </div>
        </Header>
  )
}

export default FansCrmHeader
