import { useRef } from 'react';

import JoditEditor from 'jodit-react';

import './RichEditer.css';

const RichEditer = ({ setContent, content }) => {
  const editor = useRef(null);

  const onContentChange = newContent => {
    setContent(newContent);
  };

  return <JoditEditor ref={editor} value={content} onChange={onContentChange} />;
};

export default RichEditer;
