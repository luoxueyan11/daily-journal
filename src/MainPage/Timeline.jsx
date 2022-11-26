import React from 'react'
import './Timeline.css'
import Footer from '../Homepage/Footer'
const BlogContent = [

    {
        Title: "Work on project",
        Date: "11:00 am to 13:00 pm",
        Content: "What should I feed my cat with urinary problems? If you have not already done so, read our article to find out how to spot a possible urina...",
        ImagePath: "../images/Section_6_pic_1.png",

    },

    {
        Title: "Go to the gym",
        Date: "16:00 pm to 18:00 pm",
        Content: "Puppies are usually quite busy in the first year of their lives. To achieve an adult status, there is much growing to be done! By starting beautif...",
        ImagePath: "../images/Section_6_pic_2.png",
    },

    
    // {
    //     Title: "Go to the gym",
    //     Date: "16:00 pm to 18:00 pm",
    //     Content: "Puppies are usually quite busy in the first year of their lives. To achieve an adult status, there is much growing to be done! By starting beautif...",
    //     ImagePath: "../images/Section_6_pic_2.png",
    // },

    
    // {
    //     Title: "Go to the gym",
    //     Date: "16:00 pm to 18:00 pm",
    //     Content: "Puppies are usually quite busy in the first year of their lives. To achieve an adult status, there is much growing to be done! By starting beautif...",
    //     ImagePath: "../images/Section_6_pic_2.png",
    // },


]

// allJournals 是一个人所有的日记
const allJournals = [
    {
        Date: "26/11/2022", //时间轴列出所有写过日记的Date
        journal: [ //点击Date可以展开当天的Journal内容

            {Time: "16:00 to 18:00",
            Content: "This is a journal content. Puppies are usually quite busy in the first year...",
            ImagePath: "../images/Section_6_pic_2.png"},

            {Time: "20:00 to 22:00",
            Content: "This is a journal content. To achieve an adult status, there...",
            ImagePath: "../images/Section_6_pic_4.png"},

            {Time: "22:00 to 23:00",
            Content: "This is a journal content. If I have not already done so, read...",
            ImagePath: "../images/Section_6_pic_4.png"},
            ]
    },

    {
        Date: "28/11/2022",
        journal: [
            {Time: "14:00 to 15:00",
            Content: "This is a journal content. What should I feed my cat with urinary problems? I...",
            ImagePath: "../images/Section_6_pic_3.png"},
        ]
    },
]

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