import { Container } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player'

const Layout: React.FC = ({children}) => {
  return (
    <div>
        <Navbar/>
        <Container style={{padding: '50px 0 0 0'}}>
        {children}
        </Container>
        <Player/>
    </div>
  )
}

export default Layout