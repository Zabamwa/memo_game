import styled from "styled-components";

type tBoardGame = {
  $justifyContent?: string;
  $alignItems?: string;
  $flexDirection?: string;
  $width?: string;
  $height?: string;
  $maxWidth?: string;
  $gap?: string;
  $wrap?: boolean;
};

export const Container = styled.div<tBoardGame>`
  display: flex;
  width: ${({ $width }) => $width ?? "100%"};
  max-width: ${({ $maxWidth }) => $maxWidth};
  height: ${({ $height }) => $height};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  gap: ${({ $gap }) => $gap};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
  top: 0;

  &.animate {
    top: 30%;
    position: relative;
    z-index: 2;
    transition: 0.4s;
  }
`;

export const DifficultParagraph = styled.p`
  font-size: 32px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  border-style: solid;
  border-color: transparent;
  border-width: 0 0 3px 0;
  &:hover {
    border-color: white;
  }
`;

export const DifficultTitle = styled(DifficultParagraph)`
  font-size: 32px;
  cursor: default;
  &:hover {
    border-color: transparent;
  }
`;

export const RestartBtn = styled.button`
  cursor: pointer;
  background: black;
  font-size: 32px;
  color: white;
  font-weight: bold;
  border: 4px solid white;
`;
