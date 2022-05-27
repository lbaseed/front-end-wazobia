import React from 'react';
import styled from '@emotion/styled';


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
      </TopAppBarStyle>
    </>
  );
}

export default TopAppBar;