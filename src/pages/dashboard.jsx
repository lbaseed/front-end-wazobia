import styled from '@emotion/styled'
import TopAppBar from '../components/appBar'
import VerifyEmailNotification from '../components/verifyEmailNotification'
import NewItem from '../components/newItem';
import ItemCards from '../components/ItemCards';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { getItems, reset } from '../features/items/itemsSlice';
import Spinner from '../components/Spinner';


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
  display: 'grid',
  flexDirection: 'row',
  width: '80%',
  padding: '32px',
  
})


const DashboardPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  

  const {user} = useSelector((state) => state.userAuth)
  const {items, isLoading, isError, message} = useSelector((state) => state.items)
  
  
    useEffect(() => {

      if (isError) {
        console.log(message)
      }

      if(!user) {
        navigate('/login')
      }

      if(user) {
        dispatch(getItems())
      }
      

      return () => {
        // dispatch(reset())
      }
      
    }, [user, navigate, isError, message, dispatch])

    let banna
    if(user){
     banna = !user.user.email_verified_at ? <VerifyEmailNotification /> : ""
    }

  return (
    <>
    <div className='container'>
        <DashBoardContent>
          
          {banna}
          <TopAppBar />
          <div className="dashContainer">
          { isLoading ? (<div style={{ margin:'auto', marginTop:'50px' }}><Spinner /></div>) : ("")}


              {items.length > 0 ? (
                <div>
                  {items.map((item, i) => (
                    <ItemCards key={item._id} item={item} />
                  ))}
                </div>
              ) : (
                <h3>You dont have any item</h3>
              )}
           
          </div>
            
            
            <NewItem />
                
        </DashBoardContent>
    </div>
    </>
  )
}

export default DashboardPage