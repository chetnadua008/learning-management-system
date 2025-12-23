import React, { useState } from 'react';
import ReactQuill from 'react-quill-new'; // Changed from 'react-quill'
import 'react-quill-new/dist/quill.snow.css'; // Changed CSS path

const RichTextEditor = ({ input, setInput }) => {
    // const [value, setValue] = useState('');

    const descriptionChangeHandler = (newContent) => {
        setInput({ ...input, description: newContent })
    }
    
    return (
        <ReactQuill
            theme='snow'
            value={input.description}
            onChange={descriptionChangeHandler}
        />
    );
}

export default RichTextEditor;