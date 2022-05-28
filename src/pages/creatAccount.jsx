import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system';
import { CssBaseline, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, reset } from '../features/auth/auth';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

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


const CreatAccount = () => {
  const [userState, setUserState] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.userAuth)

  useEffect(() => {

    if(isError) { toast.error(message)}

    if(isSuccess || user) { navigate('/')}

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const handleSubmit = (e) => {
      e.preventDefault();
     
      dispatch(createAccount(userState));
  };

  // if(isLoading){
  //   // return spinner here
  // }


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
                    <TextField placeholder='Type here' required id="outlined-basic" style={{ width:'320px' }} size="small" variant="outlined" autoComplete='off' onChange={ (e)=>{
                      const first_name = e.target.value;
                      // TODO: Validation

                      // add content to local state
                      setUserState({...userState, first_name});
                    }}  />
                    </FormGroup>
                    
                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>Last Name</label>
                    <TextField placeholder='Type here' required id="outlined-basic" sx={{ width:'320px', height:'20px' }} size="small" variant="outlined"  autoComplete='off' onChange={ (e)=>{
                      const last_name = e.target.value;
                      // TODO: Validation

                      // add content to local state
                      setUserState({...userState, last_name});
                    }} />
                    </FormGroup>
                </Row>
                
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
                      /// TODO: Validation

                      // add content to local state
                      setUserState({...userState, password});
                    }} />
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