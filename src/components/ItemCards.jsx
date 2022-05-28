import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { deleteItem, UpdateItem } from '../features/items/itemsSlice';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const FormGroup = styled('div')({
  display:'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '20px'
});


const theme = createTheme({
    palette: {
      grey: {
        main: '#555658',
        contrastText: '#fff',
      },
      lightGrey: {
        main: '#EFEFF0',
        contrastText: '#20262F'
      }
    },
  });


const ItemCards = ({item}) => {
    
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [itemData, setItemData] = useState({});

    const [newName, setNewName] = useState(item.name)
    const [newDesc, setNewDesc] = useState(item.description)

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (e) => {
      e.preventDefault()
        
        if(newName){
          const data = {
            'uuid' : item.uuid,
            'name': newName,
            'description': newDesc
          }
          dispatch(UpdateItem(data))
          
          setOpen(false)
        }
    }
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
                  <Button color="grey" onClick={handleClickOpen} style={{marginTop:'10px',marginRight: '30px', height:36, textTransform: 'initial', fontSize:14 }} variant="contained">
                      Edit
                  </Button>
                  <ThemeProvider theme={theme}>
                  <Button color="grey" onClick={() => dispatch(deleteItem(item.uuid))} style={{marginTop:'10px', height:36,  fontWeight:400, textTransform: 'initial', fontSize:14 }} variant="contained">
                      Delete
                  </Button>
                  </ThemeProvider>
                </div>
        </div>

        <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle style={{ height:'30px', borderBottom: '1px solid #EFEFF0' }}>Update Item</DialogTitle>
       
        <DialogContent style={{ width: '500px', height: '340px' }}>
         
          <form>
          <FormGroup> {item.uuid}
            <label style={{ marginTop: '26px', marginBottom:'5px', color:'#5F6166' }}>Name</label>
            <TextField autoFocus type={'text'} placeholder='Add Notes' value={newName} required id="outlined-basic" fullWidth size="small" autoComplete='off' onChange={ (e)=>{
                const newName = e.target.value;
                // TODO: Validation

                // add content to local state
                setNewName(newName);
            }}  />
            </FormGroup>

            <FormGroup>
            <label style={{ marginTop: '16px', marginBottom:'5px', color:'#5F6166' }}>Add Notes</label>
            <TextField type={'text'} multiline rows={4} value={newDesc} placeholder='Type your notes here' id="outlined-basic" fullWidth size="small" autoComplete='off' onChange={ (e)=>{
                const newDesc = e.target.value;
                // TODO: Validation

                // add content to local state
                setNewDesc(newDesc);
            }}  />
            </FormGroup>

            <div style={{ textAlign:'right' }}>
              <ThemeProvider theme={theme}>
                <Button color='lightGrey'  variant="contained" onClick={handleClose} style={{ marginRight:'32px' }}>Cancel</Button>
                <Button color='grey'  variant="contained" onClick={handleSubmit}>Update Event</Button>
              </ThemeProvider>
            </div>
            </form>
        </DialogContent>
      
      </Dialog>
    </>
  )
}

export default ItemCards