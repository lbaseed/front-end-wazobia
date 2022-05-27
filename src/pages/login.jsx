import React, { useState } from 'react'
import { styled } from '@mui/system';
import { CssBaseline, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser, getLorems } from '../features/auth/auth';


// const style = {
    
// }

const AccountCard = styled('div')({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    border: '1px solid #F0F0F0',
    width: '720px',
    minHeight: '377px',
    maxHeight: 392,
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

const theme = createTheme({
    palette: {
      grey: {
        main: '#B7BCC3',
        contrastText: '#fff',
      },
    },
  });



const LoginUser = () => {
  const [userState, setUserState] = useState({});
  const user = useSelector((state) => state.userAuth.data)

  const dispatcher = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatcher(signinUser(userState));
    // dispatcher(getLorems());
}

  return (
    <>
        <CssBaseline />
       <div className='container'>
            <AccountCard>   
                <span className="pageHead" >Log in</span>
                <span >If you have no account, Sign up</span>   
                
            <form onSubmit={handleSubmit} >    
                
                <span>{user}</span>
                
                <FormInputs sx={{ marginTop:'22px' }}>
                    <FormGroup>
                    <label>Email</label>
                    <TextField type={'email'} placeholder='Type your email address here' required id="outlined-basic" sx={{ width:656 }} size="small" autoComplete='off' onChange={ (e)=>{
                      const email = e.target.value;
                      // TODO: Validation

                      // add content to local state
                      setUserState({...userState, email});
                    }}  />
                    </FormGroup>

                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>Password</label>
                    <TextField placeholder='Type your password here' type={'password'} id="outlined-basic" sx={{ width: 656 }} size="small" autoComplete='off' onChange={ (e)=>{
                      const password = e.target.value;
                      // TODO: Validation

                      // add content to local state
                      setUserState({...userState, password});
                    }} />
                    </FormGroup>
                </FormInputs>
                
                <ThemeProvider theme={theme}>
                <Button type='submit' color="grey" style={{marginTop:'35px', height:48, width:656,  fontWeight:800, textTransform: 'initial', fontSize:16 }} variant="contained">
                    Log in
                </Button>
                </ThemeProvider>
            </form>
            
            </AccountCard>

       </div>
               
        
    </>
  )
}

export default LoginUser