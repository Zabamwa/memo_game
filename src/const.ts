import { tCard, tDifficult } from "./types.ts";
import Mercury from "./assets/img/mercury.webp";
import Venus from "./assets/img/venus.webp";
import Earth from "./assets/img/earth.webp";
import Mars from "./assets/img/mars.webp";
import Jupiter from "./assets/img/jupiter.webp";
import Saturn from "./assets/img/saturn.webp";
import Uranus from "./assets/img/uranus.webp";
import Neptune from "./assets/img/neptune.webp";
import Sun from "./assets/img/sun.webp";
import Meteorite from "./assets/img/meteorite.webp";
import Halley from "./assets/img/halley.webp";
import MilkyWay from "./assets/img/milky_way.webp";

export const cardsData: tCard[] = [
  {
    name: "Mercury",
    img: Mercury,
  },
  {
    name: "Venus",
    img: Venus,
  },
  {
    name: "Earth",
    img: Earth,
  },
  {
    name: "Mars",
    img: Mars,
  },
  {
    name: "Jupiter",
    img: Jupiter,
  },
  {
    name: "Saturn",
    img: Saturn,
  },
  {
    name: "Uranus",
    img: Uranus,
  },
  {
    name: "Neptune",
    img: Neptune,
  },
  {
    name: "Sun",
    img: Sun,
  },
  {
    name: "Meteorite",
    img: Meteorite,
  },
  {
    name: "Halley",
    img: Halley,
  },
  {
    name: "Milky Way",
    img: MilkyWay,
  },
];

export const EASY: tDifficult = {
  value: 6,
  text: "EASY",
};
export const MEDIUM: tDifficult = {
  value: 9,
  text: "MEDIUM",
};
export const HARD: tDifficult = {
  value: 12,
  text: "HARD",
};
