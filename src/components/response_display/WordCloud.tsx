import React from 'react';
import ReactWordcloud, { Word } from 'react-wordcloud';

interface WordCloudProps {
  words: Array<Word>;
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ReactWordcloud words={words} />
    </div>
  );
};

export default WordCloud;