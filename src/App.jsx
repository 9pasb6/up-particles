import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [currentGif, setCurrentGif] = useState('mocha.gif');
  const [showHappyGif, setShowHappyGif] = useState(false);
  const [noButtonState, setNoButtonState] = useState(0);
  const [message, setMessage] = useState('');
  const [yesButtonSize, setYesButtonSize] = useState({ fontSize: '16px', padding: '10px 20px' });
  const [showButtons, setShowButtons] = useState(true); 
  const [backgroundImage, setBackgroundImage] = useState(''); 

  const audioRef = useRef(null); // Referencia para el audio

  const gifSequence = ['mocha5final.gif', 'mocha6final.gif', 'mocha7final.gif', 'mocha9final.gif'];

  const handleYesClick = () => {
    setShowHappyGif(true);
    setMessage('¡Oh Siii!, Te Amo 🖤');
    setYesButtonSize({ fontSize: '16px', padding: '10px 20px' });
    setShowButtons(false);
    setBackgroundImage('/src/assets/mp.png');

    // Reproducir la música
    if (audioRef.current) {
      audioRef.current.play();
    }

    gifSequence.forEach((gif, index) => {
      setTimeout(() => setCurrentGif(gif), (index + 1) * 1000);
    });
  };

  const handleNoClick = () => {
    const nextState = noButtonState + 1;

    let newGif;
    let newMessage;
    switch (nextState) {
      case 1:
        newGif = 'mocha2.gif';
        newMessage = '¡Oh no! ¿Estás segura?';
        break;
      case 2:
        newGif = 'mocha4.gif';
        newMessage = '¡¿Realmente estas segura Amor?!';
        break;
      case 3:
        newGif = 'mocha3.gif';
        newMessage = 'Estás rompiendo mi corazón Maria :(';
        break;
      case 10:
        newMessage = '¡Es broma, por favor di que sí!';
        break;
      case 16:
        newMessage = 'Por favoooooor...';
        setNoButtonState(0);
        break;
      default:
        newGif = 'mocha2.gif';
    }

    if (newGif) setCurrentGif(newGif);
    if (newMessage) setMessage(newMessage);

    setYesButtonSize((prevSize) => {
      const fontSize = parseInt(prevSize.fontSize) + 4 + 'px';
      const padding = parseInt(prevSize.padding.split(' ')[0]) + 10 + 'px ' + (parseInt(prevSize.padding.split(' ')[1]) + 10) + 'px';
      return { fontSize, padding };
    });

    setNoButtonState(nextState);
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <audio ref={audioRef} src="/src/assets/admv.mp3" preload="auto" /> {/* Reproductor oculto */}

      <div id="gifContainer">
        <img src={`/src/assets/${currentGif}`} alt="Gif actual" />
      </div>

      <h1 id="question" className={showHappyGif ? 'with-bg' : ''}>
        ¿Quieres ser mi San Valentín?
      </h1>

      <div
        id="messageContainer"
        className={showHappyGif ? 'with-bg' : ''}
        style={{ display: message ? 'block' : 'none' }}
      >
        {message}
      </div>

      {showButtons && (
        <div className="button-container">
          <button
            id="siBtn"
            onClick={handleYesClick}
            style={yesButtonSize}
          >
            Sí
          </button>
          <button id="noBtn" onClick={handleNoClick}>
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default App;