/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useState } from "react";

type EditableTextProps = {
  tag: 'h1' | 'p' | 'span' | 'div'| 'strong' |'h2'|'h3';
  defaultValue: string;
  onSave: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

const EditableText = ({ tag: Tag, defaultValue, onSave, className = '', style }: EditableTextProps) => {
  const [value, setValue] = useState(defaultValue.replace(/\n/g, '<br/>'));
  const ref = useRef<HTMLElement>(null);

  const handleBlur = () => {
    if (ref.current) {
      const html = ref.current.innerHTML;
      const clean = html.replace(/<div>/g, '').replace(/<\/div>/g, '<br/>').replace(/<br><br>/g, '<br/>');
      setValue(clean);
      onSave(clean.replace(/<br\s*\/?>/g, '\n')); // Convert <br/> to \n
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '<br>');
    }
  };

  return (
    <Tag
      ref={ref as React.Ref<any>}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

export default EditableText;

