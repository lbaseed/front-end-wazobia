import React from 'react'
import { styled } from '@mui/system';
import { CssBaseline, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

// const style = {
    
// }

const AccountCard = styled('div')({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    border: '1px solid #F0F0F0',
    width: '720px',
    height: '466px',
    maxHeight: '572px',
    borderRadius: '8px',
    padding: '24px, 32px, 40px, 32px',
    paddingTop:24,
    paddingLeft: 32,
    paddingRight:32,
    paddingBottom: 40,
    marginTop:'100px',
    // gap:'40px'
  });

const FormGroup = styled('div')({
    display:'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    
});

const FormInputs = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    
});

const Row = styled('div')({
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
})

const theme = createTheme({
    palette: {
      grey: {
        main: '#B7BCC3',
        contrastText: '#fff',
      },
    },
  });

const handleSubmit = (e) => {
    e.preventDefault();
    alert("form submitted");
}

const CreatAccount = () => {
  return (
    <>
        <CssBaseline />
       <div className='container'>
            <AccountCard>   
                <span className="pageHead" >Create an Account</span>
                <span >Already have an account? Log in</span>   
                
            <form onSubmit={handleSubmit} >    
                <Row>
                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>First Name</label>
                    <TextField placeholder='Type here' required id="outlined-basic" style={{ width:'320px' }} size="small" variant="outlined" autoComplete='off'  />
                    </FormGroup>
                    
                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>Last Name</label>
                    <TextField placeholder='Type here' required id="outlined-basic" sx={{ width:'320px', height:'20px' }} size="small" variant="outlined"  autoComplete='off' />
                    </FormGroup>
                </Row>
                
                <FormInputs sx={{ marginTop:'22px' }}>
                    <FormGroup>
                    <label>Email</label>
                    <TextField type={'email'} placeholder='Type your email address here' required id="outlined-basic" sx={{ width:656 }} size="small" autoComplete='off'   />
                    </FormGroup>

                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>Password</label>
                    <TextField placeholder='Type your password here' type={'password'} id="outlined-basic" sx={{ width: 656 }} size="small" autoComplete='off'  />
                    </FormGroup>
                </FormInputs>
                
                <ThemeProvider theme={theme}>
                <Button type='submit' color="grey" style={{marginTop:'35px', height:48, width:656,  fontWeight:800, textTransform: 'initial', fontSize:16 }} variant="contained">
                    Sign Up
                </Button>
                </ThemeProvider>
            </form>
            
            </AccountCard>

       </div>
               
        
    </>
  )
}

export default CreatAccount