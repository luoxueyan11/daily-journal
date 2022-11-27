import React from 'react'
import './Timeline.css'
import Footer from '../Homepage/Footer'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState, useEffect} from 'react'; 

function Timeline(props){  

    const processJournal = (journals) => {
        const posts = [];
        for (var i=0; i<journals.length;i++){
            let p = {
                Id: journals[i].id,
                Title: journals[i].description,
                Date: journals[i].startTime + " to " + journals[i].endTime,
                // Date: journals[i].time,
                Content: journals[i].content,
            }
            posts.push(p);
        }
        return posts;
    }

    const [value, setValue] = useState('');

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    const posts = processJournal(props.journals);

    const content = props.content
    const tracker = props.tracker

    let blogPost = <div className = "timeline">
                        {<h2>{today}</h2>}
                        <div className = "blogPostWrapper">
                            {posts.map(function(item){
                                const id = item.Id;
                                const idx = tracker.lastIndexOf(id);
                                const contents = content[idx];
                                return (
                                    <div className = "blogPost"> 
                                        <div>{item.Title}</div>
                                        <div className = "date">{item.Date}</div>
                                        <>                                        
                                        <ReactQuill theme="snow" value={contents} />
                                        </>
                                        <hr></hr>
                                        <br></br>
                                    </div>
                                )
                            })}
                        </div>
                    </div>;

    return (

        <React.Fragment>
        <div class="welcome_message">Hi {props.username}, here is your journal for today!</div>
        <div>{blogPost}</div>
        </React.Fragment>)
      
    };
  
export default Timeline;