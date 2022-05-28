import React from 'react'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../features/items/itemsSlice';


const theme = createTheme({
    palette: {
      grey: {
        main: '#555658',
        contrastText: '#fff',
      },
    },
  });

  const handleDelete = () => {

    alert("hello");
  }

const ItemCards = ({item}) => {
    const dispatch = useDispatch()
  return (
    <>
        <div className="card">
              <span className="cardKey">Name</span>
              <span className="cardTitle">{item.name}</span>
              <span className="cardKey">DEscription</span>
              <div className="cardContent">
                {item.description} 
                
                {item.uuid}
              </div>
              
                <div className="cardButtons">
                  <Button color="grey" style={{marginTop:'10px',marginRight: '20px', height:36, textTransform: 'initial', fontSize:14 }} variant="contained">
                      Edit
                  </Button>
                  <ThemeProvider theme={theme}>
                  <Button color="grey" onClick={() => dispatch(deleteItem(item.uuid))} style={{marginTop:'10px', height:36,  fontWeight:400, textTransform: 'initial', fontSize:14 }} variant="contained">
                      Delete
                  </Button>
                  </ThemeProvider>
                </div>
        </div>
    </>
  )
}

export default ItemCards