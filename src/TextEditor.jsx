import React, {useCallback} from 'react';
import ReactDOM from 'react-dom';

function TextEditor(){
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }], 
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video']
    ];
  
  
    const wrapperRef = useCallback((wrapper) => {
      if (wrapper == null) return 
  
      wrapper.innerHTML = ""
      const editor = document.createElement("div")
      wrapper.append(editor)
      new Quill(editor, {
        modules: {
          toolbar: toolbarOptions
        }, 
        theme: "snow"
      });
    }, [])
  
    return <div id="container" ref={wrapperRef}></div>
  }

export default TextEditor;