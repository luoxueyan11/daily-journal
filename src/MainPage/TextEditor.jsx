import React from 'react'
import {useState, useEffect} from 'react'; 
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css"

function TextEditor(props){  

    var id = props.journalId;

    const handleJournalUpdate = (contents) => {
        props.setJournal(contents);
    };
    
    const handleTracker = (id) => {
        props.setTracker(id);
    };


    const handleSave = () => {
        const delta = quill.getContents();
        console.log(delta)
        handleJournalUpdate(delta)
        handleTracker(id)
    };

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }], 
        [{ 'align': [] }],
        ['link', 'image', 'video']
      ];

    const theme = 'snow';

    const modules = { toolbar: toolbarOptions, };

    const { quill, quillRef } = useQuill({ theme, modules});

    if (props.tracker.includes(id) == false) {
        var planInfo = props.completed.filter(obj => obj.id === id)[0]
        var beginning_content = planInfo.description;
    } else {
        var beginning_content = props.content[props.tracker.lastIndexOf(id)]
        console.log(beginning_content)
    }

    useEffect(() => {
        if (quill && props.tracker.includes(id)) {
            quill.setContents(beginning_content);
        }
      }, [quill]);

      useEffect(() => {
        if (quill && props.tracker.includes(id) == false) {
            quill.setContents([
                { insert: beginning_content, attributes: {  bold: true, underline: true } },
                { insert: '\n' }
              ]);
        }
      }, [quill]);

    return (

        <div style={{ width: 700, height: 300 }}>
            <div ref={quillRef} />
            <button onClick={handleSave}>SAVE</button>
        </div>
      );
  };

  export default TextEditor;