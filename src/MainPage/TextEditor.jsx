import React from 'react'
import {useState, useEffect} from 'react'; 
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css"

function TextEditor(props){  

    const handleJournalUpdate = (contents) => {
        props.setJournal(contents);
    };
    
    const handleTracker = (id) => {
        props.setTracker(id);
    };

    const handleJournalAdd = (j) => {
        props.addJournal(j);
    };

    const handleSave = () => {
        const delta = quill.getContents();
        const j = {
            id : id,
            startTime : start,
            endTime : end,
            // time: "16:00 to 18:00",
            description: descrip,
            content: delta
        };
        handleJournalUpdate(delta);
        handleTracker(id);
        handleJournalAdd(j, delta);
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

    const id = props.journalId;
    var planInfo = props.completed.filter(obj => obj.id === id)[0]

    // These three values are the information of a journal which will be passed into handleJournalAdd
    const start = planInfo.startTime;
    const end = planInfo.endTime;
    const descrip = planInfo.description;

    if (props.tracker.includes(id) == false) {
        var beginning_content = planInfo.description;
    } else {
        var beginning_content = props.content[props.tracker.lastIndexOf(id)]
    }

    // Initialize the contents in editor using the description in PLAN page
    useEffect(() => {
        if (quill && props.tracker.includes(id)) {
            quill.setContents(beginning_content);
        }
      }, [quill]);
    
    // If the journal has been saved before, restore the previous contents
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