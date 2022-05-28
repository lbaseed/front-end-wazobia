import React from 'react'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      grey: {
        main: '#555658',
        contrastText: '#fff',
      },
    },
  });

const ItemCards = () => {
  return (
    <>
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
    </>
  )
}

export default ItemCards