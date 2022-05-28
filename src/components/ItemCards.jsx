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

const ItemCards = ({title, content}) => {
  return (
    <>
        <div className="card">
              <span className="cardKey">Name</span>
              <span className="cardTitle">{title}</span>
              <span className="cardKey">DEscription</span>
              <div className="cardContent">
                {content.uuid}
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