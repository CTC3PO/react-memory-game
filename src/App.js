import "./App.css";
import React, { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

//card images sources/ array
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

export default function App() {
  //manage state for cards list
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //function to shuffle cards and set the cards as shuffledCards
  const shuffleCards = () => {
    //array of 12 cards by spreading out 2x the cardImages array above
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      //add on an id property for each object
      .map((card) => ({ ...card, id: Math.random() }));

    //set choice one and 2 as null in the beginning
    setChoiceOne(null);
    setChoiceOne(null);
    //update the cards list with the shuffled cards
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle choice function
  const handleChoice = (card) => {
    console.log(card);
    //evaluate if choice 1 is true, if choiceOne is true (not null), it will
    //setchoiceTwo, if not true (is null), it will setChoiceOne
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //useEffect to compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        //if cards not matched, wait a bit, then flip them back
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start game automatically (showing the grid)
  useEffect(() => {
    shuffleCards();
  }, []);

  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}
