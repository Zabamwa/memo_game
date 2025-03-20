import styled, { css } from "styled-components";

type tCard = {
  $background: string;
  $endGame: boolean;
};

export const CardGame = styled.button<tCard>`
  width: 100%;
  max-width: 150px;
  min-width: 100px;
  height: 150px;
  background: url(${({ $background }) => $background}) center center no-repeat;
  background-size: cover;
  border: 2px solid dodgerblue;
  border-radius: 15px;
  transition: 0.4s;
  &.hidden {
    background: url("../../../src/assets/img/northern_lights.webp") center
      center no-repeat;
    background-size: cover;
    border: 2px solid white;
    cursor: pointer;
    transform: rotateY(180deg);
  }
  ${({ $endGame }) =>
    $endGame &&
    css`
      opacity: 0;
      transition: 0.4s;
    `}
`;
