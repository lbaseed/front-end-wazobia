import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system';
import { CssBaseline, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, reset } from '../features/auth/auth';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import usePasswordValidation from '../hooks/usePasswordValidation';
import Spinner from '../components/Spinner';
import validator from 'validator'


const AccountCard = styled('div')({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    border: '1px solid #F0F0F0',
    width: '720px',
    height: 'auto',
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
  const [userState, setUserState] = useState({'password': '', 'email': ''});
  const [isEmail, setIsEmail] = useState(null)
  const [toggleShowPassword, setToggleShowPassword] = useState(false)
  const [upperCase, validLength, hasNumber, hasSymbol] = usePasswordValidation({ 'password':userState.password})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.userAuth)

  useEffect(() => {

    if(isError) { toast.error(message)}

    if(user && isSuccess) { 
      
      navigate('/')
      toast.success(message)
    }

  }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const handleSubmit = (e) => {
      e.preventDefault();

      dispatch(createAccount(userState));
  };

  const togglePassword = () =>  setToggleShowPassword(!toggleShowPassword)

 


  return (
    <>
        <CssBaseline />
       <div className='container'>
            <AccountCard>   
                <span className="pageHead" >Create an Account</span>
                <span >Already have an account? <Link to='/login' style={{ textDecoration: 'none' }} >Login</Link> </span>   
                { isLoading ? (<div style={{ margin: 'auto' }}><Spinner /></div>) : ""}
            <form onSubmit={handleSubmit} >    
                <Row>
                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>First Name</label>
                    <TextField id='first_name' placeholder='Type here' required  style={{ width:'320px' }} size="small" variant="outlined" autoComplete='off' onChange={ (e)=>{
                      const first_name = e.target.value;
                      // TODO: Validation

                      // add content to local state
                      setUserState({...userState, first_name});
                    }}  />
                    </FormGroup>
                    
                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>Last Name</label>
                    <TextField id='last_name' placeholder='Type here' required  sx={{ width:'320px', height:'20px' }} size="small" variant="outlined"  autoComplete='off' onChange={ (e)=>{
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
                    <TextField id="email" type={'email'} placeholder='Type your email address here' required sx={{ width:656 }} size="small" autoComplete='off' onChange={ (e)=>{
                      const email = e.target.value;
                      // TODO: Validation

                      // add content to local state
                      validator.isEmail(email) ? setIsEmail(true) : setIsEmail(false)
                      
                      if(email.length > 0) setUserState({...userState, email});
                      
                    }}  />
                    {(userState.email.length) > 0 ? (
                      <div>
                        {isEmail ? (<span style={{ color: '#07982F', fontSize: '12px' }}>correct email format</span>)
                         : 
                        (<span style={{ color: '#F41E10', fontSize: '12px' }}>wrong email format</span>)}
                      </div>
                    ) : ""}
                    </FormGroup>

                    <FormGroup sx={{ marginTop:'22px' }}>
                    <label>Password</label>
                    <OutlinedInput id='password' placeholder='Type your password here' type={toggleShowPassword ? "text": "password"} sx={{ width: 656 }} size="small" autoComplete='off' onChange={ (e)=>{
                      const password = e.target.value;
                      /// TODO: Validation

                      // add content to local state
                      setUserState({...userState, password});
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{ color:'#999F9B' }}
                        >
                          {toggleShowPassword? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </IconButton>
                      </InputAdornment>
                    }
                    />
                    {(userState.password.length) > 0 ? (
                      <div>
                      <ul style={{ textAlign: 'left', padding: '0px', paddingLeft:'15px', fontSize: '12px', lineHeight:'18px', fontWeight: '400' }}>
                          <li style={upperCase ? {color:'#07982F' } : {color:'#999B9F' }}>
                            <span>Contains atleast one upperCase letter</span>
                          </li>
                          <li style={validLength ? {color:'#07982F' } : {color:'#999B9F' }}>
                            <span>Contains eight characters</span>
                          </li>
                          <li style={hasNumber ? {color:'#07982F' } : {color:'#999B9F' }}>
                            <span>Contains atleast one number</span>
                          </li>
                          <li style={hasSymbol ? {color:'#07982F' } : {color:'#999B9F' }}>
                            <span>Contains atleast one symbol</span>
                          </li>
                      </ul>
                    </div>
                    ) : ""}
                    
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