import { CardGame } from "./Card.styles.ts";

type tCardProp = {
  background: string;
  open: boolean;
  onClick: () => void;
  endGame: boolean;
};

const Card = ({
  background,
  open = false,
  onClick,
  endGame = false,
}: tCardProp) => {
  return (
    <CardGame
      className={!open ? "hidden" : ""}
      $background={background}
      onClick={onClick}
      disabled={open}
      $endGame={endGame}
    ></CardGame>
  );
};

export default Card;
