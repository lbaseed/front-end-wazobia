import styled from '@emotion/styled'
import React from 'react'


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
  return (
    <>
        <VerifyEmailBar>
            <span>You have not verified your email address. Click here to resend verification link.</span>
        </VerifyEmailBar>
    </>
  )
}

export default VerifyEmailNotification