import React from "react";
import styled from "styled-components";

import LogoImg from "../../images/logos/logo.svg";
import { Link } from "react-router-dom";

const BrandLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.div`
  width: ${ ( { size } ) => ( size ? size + "px" : "2em" ) };
  height: ${ ( { size } ) => ( size ? size + "px" : "2em" ) };

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoTitle = styled.h2`
  margin: 0;
  font-size: ${ ( { size } ) => ( size ? size + "px" : "20px" ) };
  color: ${ ( { color } ) => ( color ? color : "#f58120" ) };
  font-weight: 900;
  margin-left: 6px;
`;

const StyledLink = styled( Link )`
  text-decoration: none;
`;

// color:#f58120;
// justify - self: flex - start;
// cursor: pointer;
// font - size: 1.5rem;
// display: flex;
// align - items: center;
// margin - left: 24px;
// font - weight: bold;
// text - decoration: none;
// `
// export const MobileIcon = styled.div`
// display: none;

// @media screen and( max - width: 768px ) {
//   display: block;
//   position: absolute;
//   top: 0;
//   right: 0;
//   transform: translate( -100 %, 60 %);
//   font - size: 1.8rem;
//   cursor: pointer;
//   color: #fff;
// }

export function BrandLogo ( props )
{
  const { logoSize, textSize, color, hideLogo } = props;

  return (
    <BrandLogoContainer>
      {!hideLogo && (
        <Link to="/">
          <LogoImage size={ logoSize }>
            <img src={ LogoImg } alt="Servycing logo" />
          </LogoImage>
        </Link>
      ) }
      <StyledLink to="/">
        <LogoTitle size={ textSize } color={ color }>
          OnCall System
        </LogoTitle>
      </StyledLink>
    </BrandLogoContainer>
  );
}
