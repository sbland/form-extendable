import React from 'react';
import { useDebounce } from './useDebounce';

const sleep = (delay) =>
  new Promise<void>((res) => {
    setTimeout(function () {
      res();
    }, delay);
  });

export const DebounceDemo = () => {
  const [saveCount, setSaveCount] = React.useState(0);
  const saveData = async (amount) => {
    console.info('saving');
    await sleep(200);
    setSaveCount((prev) => prev + amount);
  };

  const saveDataDeBounced = useDebounce({
    timeout: 1000,
    fn: saveData,
    allow: true,
  });

  return (
    <>
      <p>SaveCount: {saveCount}</p>
      <button onClick={() => saveDataDeBounced(1)}>SaveA1</button>
      <button onClick={() => saveDataDeBounced(10)}>SaveB10</button>
      <button onClick={() => setSaveCount(0)}>reset</button>
    </>
  );
};

export const DebounceDemoTextInput = () => {
  const [savedText, setSavedText] = React.useState('');
  const saveData = async (value) => {
    console.info('saving');
    await sleep(200);
    setSavedText(value);
  };

  const saveDataDeBounced = useDebounce({
    timeout: 1000,
    fn: saveData,
    allow: true,
  });

  return (
    <>
      <p>Saved Text: {savedText}</p>
      <input onChange={(e) => saveDataDeBounced(e.target.value)} />
      <button onClick={() => setSavedText('')}>reset</button>
    </>
  );
};
