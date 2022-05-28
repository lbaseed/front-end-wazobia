import styled from '@emotion/styled'
import React from 'react'
import TopAppBar from '../components/appBar'
import VerifyEmailNotification from '../components/verifyEmailNotification'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NewItem from '../components/newItem';


const DashBoardContent = styled('div')({
    background: '#E5E5E5',
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative'
})

const ItemsCardList = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  width: '80%',
  padding: '32px',
  
})

const theme = createTheme({
  palette: {
    grey: {
      main: '#555658',
      contrastText: '#fff',
    },
  },
});

const DashboardPage = () => {
  return (
    <>
    <div className='container'>
        <DashBoardContent>
          <VerifyEmailNotification />
          <TopAppBar />

          <div className="dashContainer">
            <ItemsCardList>
              <div className="card">
              <span className="cardKey">Name</span>
              <span className="cardTitle">Item 1</span>
              <span className="cardKey">DEscription</span>
              <div className="cardContent">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
              </div>
              
                <div className="cardButtons">
                  <Button color="grey" style={{marginTop:'10px', height:36, textTransform: 'initial', fontSize:14 }} variant="contained">
                      Edit
                  </Button>
                  <ThemeProvider theme={theme}>
                  <Button color="grey" style={{marginTop:'10px', height:36,  fontWeight:400, textTransform: 'initial', fontSize:14 }} variant="contained">
                      Sign Up
                  </Button>
                  </ThemeProvider>
                </div>
              </div>
            </ItemsCardList>
          </div>
            
            
            <NewItem />
                
        </DashBoardContent>
    </div>
    </>
  )
}

export default DashboardPage