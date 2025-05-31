import { useState, useRef } from 'react';
import './App.css';

import audioFile from './assets/Heather.mp3';
import background2 from './assets/background2.jpg';
import up3 from './assets/up3.png';
import HeartParticles from './components/HeartParticles';

function App() {
  const [showHappyGif, setShowHappyGif] = useState(false);
  const [message, setMessage] = useState('');
  const [showSecretButton, setShowSecretButton] = useState(false);
  const audioRef = useRef(null);

  const handleYesClick = () => {
    setShowHappyGif(true);
    setMessage('');
    setShowSecretButton(true);

    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleSecretClick = () => {
    setMessage('Con quien deseo tener miles de aventuras y envejecer es contigo, Te Amo 💙');
    setShowSecretButton(false);
    setTimeout(() => {
      setMessage('');
    }, 8000);
  };

  return (
    <div className="main-wrapper">
      {/* Fondo final */}
      {showHappyGif && (
        <div
          className="background-layer"
          style={{ backgroundImage: `url(${background2})` }}
        ></div>
      )}

      <div className="container">
        <audio ref={audioRef} src={audioFile} preload="auto" />

        {/* Botón para iniciar */}
        {!showHappyGif && (
          <div className="button-container">
            <button
              id="siBtn"
              onClick={handleYesClick}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                margin: 0,
                cursor: 'pointer',
              }}
            >
              <img
                src={up3}
                alt="Abrir"
                className="start-image-button"
                style={{ width: '100px', height: 'auto', display: 'block' }}
              />
            </button>

          </div>
        )}

        {/* Mensaje especial */}
        {message && (
          <div id="messageContainer" className="with-bg">
            {message}
          </div>
        )}

        {/* Botón secreto */}
        {showSecretButton && (
          <div className="secret-button-wrapper">
            <button className="secret-button" onClick={handleSecretClick}>
              💌
            </button>
          </div>
        )}

        {/* Corazones animados */}
        {showHappyGif && <HeartParticles imageSrc="up.png" />}
      </div>
    </div>
  );
}

export default App;
