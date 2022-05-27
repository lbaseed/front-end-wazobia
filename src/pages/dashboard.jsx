import styled from '@emotion/styled'
import React from 'react'
import TopAppBar from '../components/appBar'
import VerifyEmailNotification from '../components/verifyEmailNotification'

const DashBoardContent = styled('div')({
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '148px',
    background: '#E5E5E5',
    height: '100vh',
})
const DashboardPage = () => {
  return (
    <>
        <VerifyEmailNotification />
        <TopAppBar />
        
            <DashBoardContent>
                
            </DashBoardContent>
       
    </>
  )
}

export default DashboardPage