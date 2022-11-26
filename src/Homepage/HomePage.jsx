import React from 'react'
import Header from './Section_1';
import Footer from './Footer'

class HomePage extends React.Component{
    
    render() {
        return (
            <React.Fragment>
                <Header users = {this.props.users} userLogIn = {this.props.userLogIn} userLogOut= {this.props.userLogOut}/>
                <Footer />  
          </React.Fragment>
        )
    }
}

export default HomePage