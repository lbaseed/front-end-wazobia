import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

export default function NewItem() {
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div style={{ 'width' : '500px' }}>
      
      <div className="fab">
      <Fab color="primary" onClick={handleClickOpen} aria-label="add">
              <AddIcon />
        </Fab>
        </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Notes</DialogTitle>
        <DialogContent width={500}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          
          <FormGroup>
            <label>Name</label>
            <TextField autoFocus type={'text'} placeholder='Add Notes' required id="outlined-basic" fullWidth size="small" autoComplete='off' onChange={ (e)=>{
                const name = e.target.value;
                // TODO: Validation

                // add content to local state
                setItemData({...itemData, name});
            }}  />
            </FormGroup>

            <FormGroup>
            <label>Add Notes</label>
            <TextField type={'text'} multiline rows={4} placeholder='Type your notes here' id="outlined-basic" fullWidth size="small" autoComplete='off' onChange={ (e)=>{
                const description = e.target.value;
                // TODO: Validation

                // add content to local state
                setItemData({...itemData, description});
            }}  />
            </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
