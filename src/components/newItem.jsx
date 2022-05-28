import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../features/items/itemsSlice';


const FormGroup = styled('div')({
    display:'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px'
});

const theme = createTheme({
  palette: {
    grey: {
      main: '#999A9B',
      contrastText: '#fff',
    },
    lightGrey: {
      main: '#EFEFF0',
      contrastText: '#20262F'
    },
  },
});

export default function NewItem() {
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({});

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
      
      if(itemData.name){
        dispatch(createItem(itemData))

        setOpen(false)
      }
  }



  return (
    <div>
      
      <div className="fab" style={open ? {  display: 'none' } : {}}>
        <Fab color="primary" onClick={handleClickOpen} aria-label="add">
              <AddIcon />
        </Fab>
      </div> 
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle style={{ height:'30px', borderBottom: '1px solid #EFEFF0' }}>Create Item</DialogTitle>
       
        <DialogContent style={{ width: '500px', height: '340px' }}>
         
          <form>
          <FormGroup>
            <label style={{ marginTop: '26px', marginBottom:'5px', color:'#5F6166' }}>Name</label>
            <TextField autoFocus type={'text'} placeholder='Add Notes' required id="outlined-basic" fullWidth size="small" autoComplete='off' onChange={ (e)=>{
                const name = e.target.value;
                // TODO: Validation

                // add content to local state
                setItemData({...itemData, name});
            }}  />
            </FormGroup>

            <FormGroup>
            <label style={{ marginTop: '16px', marginBottom:'5px', color:'#5F6166' }}>Add Notes</label>
            <TextField type={'text'} multiline rows={4} placeholder='Type your notes here' id="outlined-basic" fullWidth size="small" autoComplete='off' onChange={ (e)=>{
                const description = e.target.value;
                // TODO: Validation

                // add content to local state
                setItemData({...itemData, description});
            }}  />
            </FormGroup>

            <div style={{ textAlign:'right' }}>
              <ThemeProvider theme={theme}>
                <Button color='lightGrey'  variant="contained" onClick={handleClose} style={{ marginRight:'32px' }}>Cancel</Button>
                <Button color='grey'  variant="contained" onClick={handleSubmit}>Create Event</Button>
              </ThemeProvider>
            </div>
            </form>
        </DialogContent>
      
      </Dialog>
    </div>
  );
}
