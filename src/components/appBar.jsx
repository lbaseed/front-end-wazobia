import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';


const TopAppBarStyle = styled('div')({
  
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    color: '#000',
    width: '100%',
    height: '72px',
    border: '1px solid F0F0F0',
    // paddingLeft: '150px'

})

const AppBarContent = styled('span')({
  fontSize: 16,
  fontWeight: 500,
  marginTop: 30,
  marginLeft: 150
})

const AppBarContentRight = styled('span')({
  fontSize: 16,
  fontWeight: 500,
  marginTop: 30,
  marginRight: 150
})

const TopAppBar =() => {

  return (
    <>
      <TopAppBarStyle>
        
        <AppBarContent>
          Dashboard
        </AppBarContent>
        
          <AppBarContentRight>
             <Link to="/logout" >
                Logout
             </Link>
          </AppBarContentRight> 
          
        
      </TopAppBarStyle>
    </>
  );
}

export default TopAppBar;