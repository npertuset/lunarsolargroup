import React from "react";
import styled from "styled-components";

import MenuClosed from "./MenuClosed";
import MenuOpen from "./MenuOpen";

const mobileBreakpoint = "1000px";

const MenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50%;
  background-color: white;
  padding: 8px 0 0 15px;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
  }
`;
export const Menu = () => {
  const [menuStatusOpen, setMenuStatusOpen] = React.useState(false);

  return (
    <>
      {menuStatusOpen ? (
        <MenuWrapper>
          <div>
            <MenuOpen onChildClick={() => setMenuStatusOpen(!menuStatusOpen)} />
          </div>
          <div>Dream Light High Rohode Kin Spritz</div>
        </MenuWrapper>
      ) : null}
      <MenuClosed onChildClick={() => setMenuStatusOpen(!menuStatusOpen)} />
    </>
  );
};
