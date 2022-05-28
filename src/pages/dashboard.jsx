import styled from '@emotion/styled'
import React from 'react'
import TopAppBar from '../components/appBar'
import VerifyEmailNotification from '../components/verifyEmailNotification'
import NewItem from '../components/newItem';
import ItemCards from '../components/ItemCards';


const DashBoardContent = styled('div')({
    background: '#E5E5E5',
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative'
})

const ItemsCardList = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  width: '80%',
  padding: '32px',
  
})


const DashboardPage = () => {
  return (
    <>
    <div className='container'>
        <DashBoardContent>
          <VerifyEmailNotification />
          <TopAppBar />

          <div className="dashContainer">
            <ItemsCardList>
              <ItemCards />
            </ItemsCardList>
            
          </div>
            
            
            <NewItem />
                
        </DashBoardContent>
    </div>
    </>
  )
}

export default DashboardPage