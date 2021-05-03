import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

import { BrandLogo } from "../brandLogo";
import { Button } from "../button";
import { Marginer } from "../marginer";

import { Link } from "react-router-dom";
import { deviceSize } from "../responsive";
import { useMediaQuery } from "react-responsive";
import { getUser } from "../../helpers/getUser";

// const Nav = styled.nav`
//   background: ${ ( { scrollNav } ) => ( scrollNav ? '#000' : 'transparent' ) };
//   height: 80px;
//   margin-top: -80px;
//   display:flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 1rem;
//   position: sticky;
//   top:0;
//   z-index:10;

//   @media screen and (max-width: 960px) {
//     transition: 0.8s all ease;
//   }
// `

const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 5;
  background-color: ${({ useTransparent }) =>
    useTransparent ? "transparent" : "#022e24"};
`;

const AccessibilityContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-right: -22px;
  @media screen and( max-width: 768px ) {
    display: none;
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 80px;
`;

const AnchorLink = styled(Link)`
  height: 100%;
  font-size: 15px;
  color: #000;
  align-items: center;
  display: flex;
  cursor: pointer;
  text-decoration: none;
  padding: 0 1rem;
  outline: none;
  transition: all 200ms ease-in-out;

  &:hover {
    filter: contrast(0.6);
  }

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

const Seperator = styled.div`
  min-height: 35%;
  width: 1px;
  background-color: #fff;
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;
export function NavbarDark(props) {
  const { useTransparent, toggle } = props;
  const user = getUser();

  const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });

  // if (props.dark) {
  //   console.log("dark");
  // } else {
  //   console.log("not dark");
  // }

  return (
    <NavbarContainer useTransparent={useTransparent}>
      <BrandLogo />
      <MobileIcon onClick={toggle}>
        <FaBars />
      </MobileIcon>
      <AccessibilityContainer>
        <NavItem>
          {!isMobile && <AnchorLink>Specialists Portal</AnchorLink>}
          {!isMobile && <Marginer direction="horizontal" margin={10} />}
          {!isMobile && <Seperator />}
          {!isMobile && <AnchorLink>Discover</AnchorLink>}
          {!isMobile && <Marginer direction="horizontal" margin={10} />}
          {!isMobile && <Seperator />}
          {!isMobile && <AnchorLink>About Us</AnchorLink>}
          {!isMobile && <Marginer direction="horizontal" margin={10} />}
          {!isMobile && <Seperator />}
          {!isMobile && <AnchorLink>Contact Us</AnchorLink>}
          {!isMobile && <Marginer direction="horizontal" margin={10} />}
          {!isMobile && <Seperator />}

          {!isMobile && <Marginer direction="horizontal" margin={10} />}
          {!isMobile && (
            <Link to="../../components/users/customer">
              <Button size={16}>Services</Button>
            </Link>
          )}
          {!isMobile && <Marginer direction="horizontal" margin={10} />}
          {!user ? (
            <>
              {!isMobile && (
                <Link to="/customer/access/signup">
                  <Button size={15}>SignUp</Button>
                </Link>
              )}
              {!isMobile && (
                <AnchorLink to="/customer/access/signin">Login</AnchorLink>
              )}
            </>
          ) : (
            <>
              {!isMobile && (
                <AnchorLink to={`/account/`}>My Account</AnchorLink>
              )}
            </>
          )}
          {!isMobile && <Marginer direction="horizontal" margin={10} />}
        </NavItem>
      </AccessibilityContainer>
    </NavbarContainer>
  );
}
