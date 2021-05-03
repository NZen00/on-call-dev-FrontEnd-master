import React from 'react'
import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'
import { FaTimes } from 'react-icons/fa'

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${ ( { isOpen } ) => ( isOpen ? '100%' : '0' ) };
  top: ${ ( { isOpen } ) => ( isOpen ? '0' : '-100%' ) }; 
 
`;

const CloseIcon = styled( FaTimes )`
  color: #fff;
`;

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;

`;

const SidebarWrapper = styled.div`
  color: #fff;
`;

const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media  screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

const SidebarLink = styled( LinkS )`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 02s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom:1rem;
  padding-bottom:1rem;
`
const SidebarRoute = styled( LinkR )`
background: #01bf71;
white-space: nowrap;
border-radius: 5px;
    height: 100%;
  font-size: 1.5rem;
  color: #ffffff;
  align-items: center;
  display: flex;
  cursor: pointer;
  text-decoration: none;
  padding: 0 5rem;
  outline: none;
  border:none;
  transition: all 0.2s  ease-in-out;


  &:hover {
    filter: contrast(0.6);
     transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }

  &.active {
  border-bottom: 3px solid #01bf71

}
`;


const Sidebar = ( { isOpen, toggle}) =>
{
  return (
    <SidebarContainer isOpen=
    {isOpen} onClick={toggle} >
      <Icon onClick={toggle} >
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='Specialists_Portal' onClick={ toggle }> Specialists Portal</SidebarLink>
          <SidebarLink to='Discover' onClick={ toggle }> Discover</SidebarLink>
          <SidebarLink to='About_Us' onClick={ toggle }> About Us</SidebarLink>
          <SidebarLink to='Contact_Us' onClick={ toggle }> Contact Us</SidebarLink>
          <SideBtnWrap>
            <SidebarRoute to='/customer/access/signup' onClick={ toggle }>Services</SidebarRoute>
          </SideBtnWrap>
          <SideBtnWrap>
            <SidebarRoute to='/customer/access/signup' onClick={ toggle }> SignUp</SidebarRoute>
          </SideBtnWrap>
          <SideBtnWrap>
            <SidebarRoute to='/customer/access/signup' onClick={ toggle }> Login</SidebarRoute>
          </SideBtnWrap>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
    //   <SidebarContainer>
    //     <Icon>
    //       <CloseIcon />
    //     </Icon>
    //     <SidebarWrapper>
    //       <SidebarMenu>
    //         <SidebarLink to='Specialists_Portal'> Specialists Portal</SidebarLink>
    //         <SidebarLink to='Discover'> Discover</SidebarLink>
    //         <SidebarLink to='About_Us'> About Us</SidebarLink>
    //         <SidebarLink to='Contact_Us'> Contact Us</SidebarLink>
    //       </SidebarMenu>
    //     </SidebarWrapper>

    //     <SideBtnWrap>
    //       <SidebarRoute to='/customer/access/signup'> Services</SidebarRoute>
    //     </SideBtnWrap>
    //     <SideBtnWrap>
    //       <SidebarRoute to='/customer/access/signup'> Sign Up</SidebarRoute>
    //     </SideBtnWrap>
    //     <SideBtnWrap>
    //       <SidebarRoute to='/customer/access/signup'> Login</SidebarRoute>
    //     </SideBtnWrap>

    //   </SidebarContainer>
  )
}

export default Sidebar
