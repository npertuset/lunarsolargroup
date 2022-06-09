import React from "react";
import styled from "styled-components";
import MenuClosed from "./MenuClosed";

const StyledButton = styled.div`
  // display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50%;
  background-color: white;
`;
export const Menu = () => {
  const [menuOpen, setLiked] = React.useState(false);

  return (
    <>
      {menuOpen ? (
        <StyledButton>
          <div onClick={() => setLiked(!menuOpen)}>Close</div>
        </StyledButton>
      ) : null}
      <MenuClosed onChildClick={() => setLiked(!menuOpen)} />
    </>
  );
};
