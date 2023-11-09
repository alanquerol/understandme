import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [language, setLanguage] = useState('es'); // default language set to Spanish

  // Function to handle audio recording submission
  const submitAudio = async (audioBlob) => {
    try {
      // Convert blob to buffer
      const audioBuffer = await audioBlob.arrayBuffer();
      const response = await axios.post('/voice-to-text', { audio: audioBuffer });
      setTranscription(response.data.transcribedText);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };

  // Function to handle translation request
  const translateText = async () => {
    try {
      const response = await axios.post('/translate', { text: transcription, targetLanguage: language });
      setTranslation(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  // Function to handle speech playback request
  const playSpeech = async () => {
    try {
      const response = await axios.post('/text-to-speech', { text: translation, language });
      // Assuming response returns a URL to the audio file
      const audio = new Audio(response.data.speechAudioLink);
      audio.play();
    } catch (error) {
      console.error('Error converting text to speech:', error);
    }
  };

  return (
    <div className="App">
      <h1>Understandme</h1>
      {/* Audio recording component (not implemented here) */}
      {/* You would need to create a component that records audio and returns an audio blob */}
      <button onClick={() => submitAudio(/* audioBlob */)}>Transcribe Audio</button>

      <h2>Transcription:</h2>
      <p>{transcription}</p>

      <h2>Translation (to {language}):</h2>
      <p>{translation}</p>
      <button onClick={translateText}>Translate</button>

      <h2>Play Speech:</h2>
      <button onClick={playSpeech}>Play</button>
    </div>
  );
};

export default App;
