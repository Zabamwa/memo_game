import {
  Container,
  DifficultParagraph,
  DifficultTitle,
  RestartBtn,
} from "./BoardGame.styles.ts";
import { RefObject, useEffect, useRef, useState } from "react";
import Card from "../Card/Card.tsx";
import { cardsData, EASY, HARD, MEDIUM } from "../../const.ts";
import { tCardGame, tLocalStorageGameHistory } from "../../types.ts";
import { useCards, useCardsActions } from "../../stores/cardsStore.ts";
import {
  useStatistic,
  useStatisticActions,
} from "../../stores/statisticStore.ts";
import dayjs from "dayjs";

const card: tCardGame = {
  name: "",
  id: null,
  img: "",
  isOpen: false,
};

const BoardGame = () => {
  const cards = useCards();
  const { setCards } = useCardsActions();

  const { difficult, move, score, revelatedTiles, matchedPairs, time } =
    useStatistic();
  const {
    setDifficult,
    setMove,
    setScore,
    setRevelatedTiles,
    setMatchedPairs,
    setTime,
    getTime,
    restartGame,
  } = useStatisticActions();

  const [firstCard, setFirstCard] = useState<tCardGame>(card);
  const [secondCard, setSecondCard] = useState<tCardGame>(card);

  const interval: RefObject<number> = useRef(0);

  const shuffleCards = () => {
    const cardsArray = cardsData.slice(0, difficult?.value!);
    const shuffledCards = [...cardsArray, ...cardsArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), isOpen: false }));
    setCards(shuffledCards);
  };

  useEffect(() => {
    if (difficult !== null) {
      shuffleCards();
      interval.current = setInterval(() => {
        setTime();
      }, 1000);
      return () => {
        clearInterval(interval.current);
      };
    }
  }, [difficult]);

  const openCard = (id: number) => {
    if (firstCard.id && secondCard.id) return;
    setRevelatedTiles();
    const data = [...cards];
    const index = cards.findIndex((item) => item.id === id);
    data[index].isOpen = true;
    setCards(data);
    if (firstCard.id === null) {
      setFirstCard(data[index]);
    } else {
      setSecondCard(data[index]);
      setMove();
    }
  };

  const checkOpenCards = () => {
    if (firstCard.name !== secondCard.name) {
      const data = [...cards];
      data.forEach((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          card.isOpen = false;
        }
      });
      setCards(data);
    } else {
      setScore();
      setMatchedPairs();
    }
    setFirstCard(card);
    setSecondCard(card);
  };

  useEffect(() => {
    if (!!firstCard.id && !!secondCard.id) {
      setTimeout(() => {
        checkOpenCards();
      }, 400);
    }
  }, [secondCard]);

  const saveGame = () => {
    const historyData = window.localStorage.getItem("game_history");
    const data: tLocalStorageGameHistory[] = historyData
      ? JSON.parse(historyData)
      : [];
    const history: tLocalStorageGameHistory = {
      difficult_game: difficult?.text ?? "",
      move,
      revelatedTiles,
      matchedPairs,
      score,
      game_time: getTime(time),
      game_data: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
    data.push(history);
    window.localStorage.setItem("game_history", JSON.stringify(data));
  };

  useEffect(() => {
    if (score === difficult?.value) {
      clearInterval(interval.current);
      saveGame();
    }
  }, [score]);

  const restart = () => {
    saveGame();
    restartGame();
    clearInterval(interval.current);
  };

  return (
    <Container>
      {!difficult && (
        <Container
          $flexDirection="column"
          $alignItems="center"
          $justifyContent="center"
        >
          <DifficultTitle>Choose difficult level:</DifficultTitle>
          <DifficultParagraph onClick={() => setDifficult(EASY)}>
            Easy - 6 pairs
          </DifficultParagraph>
          <DifficultParagraph onClick={() => setDifficult(MEDIUM)}>
            Medium - 9 pairs
          </DifficultParagraph>
          <DifficultParagraph onClick={() => setDifficult(HARD)}>
            Hard - 12 pairs
          </DifficultParagraph>
        </Container>
      )}
      {difficult && (
        <Container
          $justifyContent="flex-start"
          $flexDirection="column"
          $alignItems="center"
          $gap="30px"
        >
          <Container
            $flexDirection="column"
            $alignItems="center"
            className={score === difficult?.value ? "animate" : ""}
          >
            <RestartBtn onClick={restart}>Restart</RestartBtn>
            <DifficultTitle>{`Moves: ${move}`}</DifficultTitle>
            <DifficultTitle>{`Revelated tiles: ${revelatedTiles}`}</DifficultTitle>
            <DifficultTitle>{`Matched pairs: ${matchedPairs}`}</DifficultTitle>
            <DifficultTitle>{getTime(time)}</DifficultTitle>
          </Container>
          <Container
            $justifyContent="center"
            $gap="20px"
            $maxWidth="1020px  "
            $wrap
          >
            {cards.map((card) => (
              <Card
                background={card.img}
                open={card.isOpen}
                onClick={() => openCard(card.id!)}
                endGame={score === difficult.value}
                key={card.id}
              />
            ))}
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default BoardGame;
