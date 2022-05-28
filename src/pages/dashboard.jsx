import styled from '@emotion/styled'
import TopAppBar from '../components/appBar'
import VerifyEmailNotification from '../components/verifyEmailNotification'
import NewItem from '../components/newItem';
import ItemCards from '../components/ItemCards';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'


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
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const {user} = useSelector((state) => state.userAuth)
  
    useEffect(() => {
      if(!user) {
        navigate('/login')
      }
    }, [])

  return (
    <>
    <div className='container'>
        <DashBoardContent>
          <VerifyEmailNotification />
          <TopAppBar />

          <div className="dashContainer">
            <ItemsCardList>
              {/* <ItemCards content={user.user}  /> */}
            </ItemsCardList>
            
          </div>
            
            
            <NewItem />
                
        </DashBoardContent>
    </div>
    </>
  )
}

export default DashboardPage