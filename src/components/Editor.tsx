import React, { forwardRef, useImperativeHandle, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Editor = forwardRef((props: { text?: string }, _ref) => {
    const [text, setText] = useState(props.text);
    const handleChange = (value: string) => {
        setText(value);
    };
    useImperativeHandle(_ref, () => ({
        getText: () => {
            return text;
        },
        setText: (value: string) => {
            setText(value);
        },
    }));
    return <ReactQuill value={text || ""} onChange={handleChange} className="editor" />;
});

export default Editor;
