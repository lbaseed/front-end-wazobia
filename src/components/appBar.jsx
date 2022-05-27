import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';


const TopAppBarStyle = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  textAlign: 'center',
  height: '72px',
  width: '100%',
  background: '#FFFFFF',
  paddingLeft: 100,
  border: '1px solid F0F0F0',
})

const AppBarContent = styled('span')({
  fontSize: 16,
  fontWeight: 500,
  marginTop: 30
})
const TopAppBar =() => {

  return (
    <>
      <TopAppBarStyle>
        <AppBarContent>
          Dashboard
        </AppBarContent>
        <ul>
          <li>
            <Link to='/' >
              <FaSignInAlt />
            </Link>
          </li>
        </ul>
      </TopAppBarStyle>
    </>
  );
}

export default TopAppBar;