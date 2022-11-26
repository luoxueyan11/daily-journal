import React from 'react' ;
import Slider from "react-slick";   // make journal blogs looks like a serious of cards in a slider.
import './Section_2.css';
import JournalContent from './JournalPostContent.jsx';

class Cards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: this.props.data.ImagePath,
            itemLink: this.props.data.ItemLink,
            title: this.props.data.Title,
            date: this.props.data.Date,
            author: this.props.data.Author
        }
    }

    render() {
        return (
            <figure className="cardStyle">
                <img src={this.state.image} />
                <figcaption>
                    <a href={this.state.itemLink}>{this.state.title}</a>
                    <h5>
                        <p>Date: {this.state.date}.</p>
                        <p>Author: {this.state.author}.</p>
                    </h5>
                </figcaption><a href="#"></a>
             </figure>
        )
    }
}


class JournalPost extends React.Component{
    constructor(props){
        super(props);     
        this.state = {
            window_width: window.innerWidth,
            window_height: window.innerHeight
        }
    }

    updateDimensions = () => {
        this.setState({ window_width: window.innerWidth, window_height: window.innerHeight });
      };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
      }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }


    render() {
        if (this.state.window_width < 720) {
            var settings = {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            }        
        }

        else {
            var settings = {
                dots: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
            }  
        }

        let journalCards;

        if (JournalContent.length > 0) {
			journalCards = JournalContent.map(function(item, index) {              
				return (
						<div key={index}>
							<Cards data={item} />
						</div>
				)
			})

		} else {    
			journalCards = <p>Please add some cards</p>
		}

        return (
			<div className='section2'>
                <h2 className = "recommend">Journal Recommendations</h2>
                <span className = "subtitle"> *Hover to see Journal Details & Click to reach Journal </span>
				<Slider {...settings}>{journalCards}</Slider>
			</div>
		);


    }

}


export default JournalPost;