import { useCallback, useRef } from 'react';

import JoditEditor from 'jodit-react';

import style from './RichEditer.module.css';

const RichEditer = ({ setContent, content }) => {
  const editor = useRef(null);

  const onContentChange = useCallback(
    newContent => {
      setContent(newContent);
    },

    [setContent]
  );

  const config = {
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons:
      'bold,italic,underline,ul,ol,font,fontsize,paragraph,lineHeight,cut,copy,paste,hr,table,link,undo,redo,preview',
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  return (
    <div className={style.RichEditer}>
      <JoditEditor ref={editor} value={content} onChange={onContentChange} config={config} />
    </div>
  );
};

export default RichEditer;
