import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resendVerification } from '../features/auth/auth'





const VerifyEmailBar = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0CB',
    color: '#000',
    width: '100%',
    height: 48,
})
const VerifyEmailNotification = () => {
    const {user, isLoading, isSuccess, isError} = useSelector((state) => state.userAuth)
    const dispatch = useDispatch()

  const handleResendVerification = () => {
    // resend verification link here
    if(user){
      dispatch(resendVerification())
      
    }
  }
  return (
    <>
        <VerifyEmailBar>
            <span>You have not verified your email address. Click <button onClick={handleResendVerification} style={{ all: 'unset', cursor:'pointer', color:'blue' }} >here</button>  to resend verification link.</span>
        </VerifyEmailBar>
    </>
  )
}

export default VerifyEmailNotification