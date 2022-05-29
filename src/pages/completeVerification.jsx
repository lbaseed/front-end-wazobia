import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { styled } from '@mui/system';
import {BsCheckCircle, BsChevronRight} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../features/auth/auth';
import Spinner from '../components/Spinner';

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
    margin: 'auto',
    marginTop:'159px',
  });

const CompleteVerification = () => {
    const dispatch = useDispatch()
    const {isLoading, message} = useSelector((state)=> state.userAuth)

    let params  = useParams()

    useEffect(()=>{
        
        //perform email verification call here
        dispatch(verifyEmail(params.vtoken))

    },[message])


  return (
    <>
        <AccountCard>

            <div style={{ margin:'auto' }}>
            { isLoading ? (<div style={{ margin: 'auto', marginBottom: '20px', marginLeft: '100px', color: '#07982F' }}><Spinner sx={{ color: '#07982F' }} /></div>) : 
            (<BsCheckCircle style={{ fontSize: '70px', margin: 'auto', marginBottom: '20px', color: '#07982F' }} />)
            }
                
                <p>Your Email Address {message} has been verified</p>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                    Go to Dashboard <BsChevronRight />
                </Link>
            </div>

        </AccountCard>
        
    </>
  )
}

export default CompleteVerification