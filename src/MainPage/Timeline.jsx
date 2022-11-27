import React from 'react'
import './Timeline.css'
import Footer from '../Homepage/Footer'

export default class Timeline extends React.Component {
    constructor(){
        super();
        } 

    processJournal(journals){
        const posts = [];
        for (var i=0; i<journals.length;i++){
            let p = {
                Title: journals[i].description,
                Date: journals[i].startTime + " to " + journals[i].endTime,
                Content: journals[i].content,
                ImagePath: "../images/Section_6_pic_2.png",
            }
            posts.push(p);
        }
        return posts;
    }
    render () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        const posts = this.processJournal(this.props.journals);
        let blogPost = <div className = "timeline">
                            {<h2>{today}</h2>}
                            <div className = "blogPostWrapper">
                                {posts.map(function(item){
                                    return (
                                        <div className = "blogPost"> 
                                            <img src = {item.ImagePath}/>
                                            <div>{item.Title}</div>
                                            <p className = "date">{item.Date}</p>
                                            <p className = "content">{item.Content}</p>
                                            <hr></hr>
                                            <br></br>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>;

        return (

            <React.Fragment>
            <div>{blogPost}</div>
            </React.Fragment>)
    }
}