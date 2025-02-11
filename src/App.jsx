import { useState, useEffect, useRef } from 'react';
import './App.css';

// Importación de archivos de assets
import mpImage from './assets/mp.png';
import mpMobileImage from './assets/mp2.jpeg';
import audioFile from './assets/admv.mp3';

// Importar los GIFs necesarios
import mochaGif from './assets/mocha.gif';
import mocha2Gif from './assets/mocha2.gif';
import mocha3Gif from './assets/mocha3.gif';
import mocha4Gif from './assets/mocha4.gif';
import mocha5finalGif from './assets/mocha5final.gif';
import mocha6finalGif from './assets/mocha6final.gif';
import mocha7finalGif from './assets/mocha7final.gif';
import mocha9finalGif from './assets/mocha9final.gif';

function App() {
  const [currentGif, setCurrentGif] = useState(mochaGif);
  const [showHappyGif, setShowHappyGif] = useState(false);
  const [noButtonState, setNoButtonState] = useState(0);
  const [message, setMessage] = useState('');
  const [yesButtonSize, setYesButtonSize] = useState({ fontSize: '16px', padding: '10px 20px' });
  const [showButtons, setShowButtons] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');
  const audioRef = useRef(null);

  const gifSequence = [mocha5finalGif, mocha6finalGif, mocha7finalGif, mocha9finalGif];

  useEffect(() => {
    const updateBackgroundForDevice = () => {
      if (window.innerWidth <= 768) {
        setBackgroundImage(mpMobileImage);  // Fondo para móvil
      } else {
        setBackgroundImage(mpImage);        // Fondo para pantallas grandes
      }
    };

    if (showHappyGif) {
      updateBackgroundForDevice();
      window.addEventListener('resize', updateBackgroundForDevice);
    }

    return () => {
      window.removeEventListener('resize', updateBackgroundForDevice);
    };
  }, [showHappyGif]);

  const handleYesClick = () => {
    setShowHappyGif(true);
    setMessage('¡Oh Siii!, Te Amo 🖤');
    setYesButtonSize({ fontSize: '16px', padding: '10px 20px' });
    setShowButtons(false);

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
        newGif = mocha2Gif;
        newMessage = '¡Oh no! ¿Estás segura?';
        break;
      case 2:
        newGif = mocha4Gif;
        newMessage = '¡¿Realmente estas segura Amor?!';
        break;
      case 3:
        newGif = mocha3Gif;
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
        newGif = mocha2Gif;
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
      style={{
        backgroundImage: showHappyGif ? `url(${backgroundImage})` : '',
        backgroundColor: showHappyGif ? 'transparent' : '#ffffff',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <audio ref={audioRef} src={audioFile} preload="auto" />

      <div id="gifContainer">
        <img src={currentGif} alt="Gif actual" />
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