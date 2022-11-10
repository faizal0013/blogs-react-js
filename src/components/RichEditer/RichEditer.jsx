import { useRef } from 'react';

import JoditEditor from 'jodit-react';

import style from './RichEditer.module.css';

const RichEditer = ({ setContent, content }) => {
  const editor = useRef(null);

  const onContentChange = newContent => {
    setContent(newContent);
  };

  return (
    <div className={style.RichEditer}>
      <JoditEditor ref={editor} value={content} onChange={onContentChange} />
    </div>
  );
};

export default RichEditer;
