import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Footer from '../Homepage/Footer'
import NavBar from './NavBar2'
import { HashLink as Link } from "react-router-hash-link"
import  {withRouter} from "react-router-dom"
import Journal from './Journal'
import Plan from './Plan'
import Timeline from './Timeline'


class MainPage extends React.Component {
    constructor(){
    super();
    this.switchPage = this.switchPage.bind(this);
    this.state = {plans:[], completed:[], selector: 1, journals:[], content: [], tracker: [],username:""}; 
    this.completePlans = this.completePlans.bind(this);
    this.uncheckPlans = this.uncheckPlans.bind(this);
    this.addPlans = this.addPlans.bind(this);
    this.addJournal = this.addJournal.bind(this);
    this.deleteJournal = this.deleteJournal.bind(this);
    this.deletePlans = this.deletePlans.bind(this);
    this.setJournal = this.setJournal.bind(this);
    this.setTracker = this.setTracker.bind(this);
    } 

    getInfo(entry) {
      var result = new Array();
      const info = localStorage.getItem(entry);
      if (info != null){
        result = JSON.parse(info);
      }
      return result;
    }

    /*get corresponding user workspace for the current user from local storage*/
    getUserSpace(useremail){
      const data = this.getInfo("DATA");
      const result = data.find(u => u.user == useremail);
      return result
    }

    updateLocalStorage(entry, arr) {
      const data = this.getInfo("DATA");
      for (var i=0; i<data.length; i++){
        if (data[i].user == this.props.user) {
          data[i][entry] = arr;
          break;
        }
      }
      localStorage.setItem('DATA', JSON.stringify(data));
    }


    switchPage(selector){
        console.log(selector);
        this.setState({selector:selector})
    }

    componentDidMount() {
      const userSpace = this.getUserSpace(this.props.user);
      console.log(userSpace);
      this.setState({plans:userSpace.plans,
                    completed:userSpace.completed,
                    journals:userSpace.allJournals,
                    username:userSpace.username
                  })
    }

    addJournal(journal) {
      const temp = this.state.journals;
      temp.push(journal);
      this.setState({journals:temp});
      console.log(temp)
    }

    deleteJournal(id){
      const temp = this.state.journals;
      const updateJournals = temp.filter(function(journal){
        return journal.id != id;
      })  
      this.setState({journals:updateJournals});
    }



    addPlans(plan){
        const temp = this.state.plans;
        temp.push(plan);
        this.setState({plans:temp});
        this.updateLocalStorage("plans",temp);
        console.log(temp)
      }
    
    deletePlans(id){
      this.uncheckPlans(id);
      const plans = this.state.plans;
      const updatePlans = plans.filter(function(plan){
        return plan.id != id;
      })
      const journalNeedsDel = this.state.journals.filter(obj => obj.id === id)
      if (journalNeedsDel.length > 0) {
        this.deleteJournal(id);
      };
      this.setState({plans:updatePlans});
      this.updateLocalStorage("plans",updatePlans);
    }
    
    completePlans(id){
      const plans = this.state.plans;
      const temp = this.state.completed;
      for (var i=0; i<plans.length; i++){
        if (plans[i].id == id){
          let newComplete = {
            id: plans[i].id,
            startTime: plans[i].startTime,
            endTime: plans[i].endTime,
            description: plans[i].description,
            checked: true
          }
          this.state.plans[i] = newComplete;
          this.updateLocalStorage("plans", this.state.plans);
          temp.push(newComplete);
        }
      }
      this.setState({completed: temp.sort((a, b) => (a.id > b.id) ? 1 : -1)}, function () {
        console.log("check a plan");
      });
      this.updateLocalStorage("completed",temp.sort((a, b) => (a.id > b.id) ? 1 : -1));
    }
    
    uncheckPlans(id){
      const plans = this.state.plans;
      const temp = this.state.completed;
      const updateComplete = temp.filter(function(plan){
        return plan.id != id;
      })
      this.setState({completed: updateComplete}, function () {
        console.log("uncheck a plan");
    });
      this.updateLocalStorage("completed",updateComplete);
  
      
      for (var i=0; i<plans.length; i++){
        if (plans[i].id == id){
          let newUncheck = {
            id: plans[i].id,
            startTime: plans[i].startTime,
            endTime: plans[i].endTime,
            description: plans[i].description,
            checked: false
          }
          plans[i] = newUncheck;
        }
      }
    }

    setJournal(contents) {
      const temp = this.state.content;
      temp.push(contents)
      this.setState({content:temp});
      console.log('content', this.state.content)
    }

    setTracker(id) {
      const temp = this.state.tracker;
      temp.push(id)
      this.setState({updated:temp});
      console.log('content', this.state.tracker)
    }


    render() {
      const conStyle ={ "background-image": "url('../Images/main_pic1.jpg')" , "margin-bottom":"5%"};

        return (
            <React.Fragment>
                <div className = "loginPage" style={conStyle}>
                    <div className = "navBarWrapper">
                        <NavBar switchPage={this.switchPage}/>
                    </div>

                    <div className = 'content'> 
                    {this.state.selector == 1 && (<Timeline journals={this.state.journals}  username={this.state.username} tracker={this.state.tracker} content={this.state.content}/>)}
                    {this.state.selector == 2 && (<Plan plans={this.state.plans} completed={this.state.completed} 
                                                        completePlans={this.completePlans} uncheckPlans={this.uncheckPlans}
                                                        addPlans={this.addPlans}
                                                        deletePlans={this.deletePlans}
                                                        />)}
                    {this.state.selector == 3 && (<Journal completed={this.state.completed} tracker={this.state.tracker} content={this.state.content}
                                                           setJournal={this.setJournal} setTracker={this.setTracker} addJournal={this.addJournal}/>)}

                    </div>
                    <div class = "footerWrapper"> 
                        {/* <Footer /> */}
                    </div>
                </div>
            </React.Fragment>
        )


    }

}

export default withRouter(MainPage)