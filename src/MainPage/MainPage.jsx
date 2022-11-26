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

const initialPlan = [
    {
      id : 1,
      startTime : "10:00",
      endTime : "11:00",
      description: "This is a task",
      checked: false
    },
    {
      id : 2,
      startTime : "14:00",
      endTime : "16:00",
      description: "This is a task",
      checked: false
    },
  ]

const initialJournal = [
    {
        id : 1,
        startTime : "10:00",
        endTime : "11:00",
        description: "This is a task description",
        content: "This is journal, this is journal, this is journal, this is journal, this is journal, this is journal, this is journal."
    },

    {
        id : 2,
        startTime : "16:00",
        endTime : "18:00",
        description: "This is a task description",
        content: "This is journal, this is journal, this is journal, this is journal, this is journal, this is journal, this is journal."
    },

    {
        id : 3,
        startTime : "20:00",
        endTime : "22:00",
        description: "This is a task description",
        content: "This is journal, this is journal, this is journal, this is journal, this is journal, this is journal, this is journal."
    }

]



class MainPage extends React.Component {
    constructor(){
    super();
    this.switchPage = this.switchPage.bind(this);
    this.state = {plans:initialPlan, completed:[], selector: 1, journals:initialJournal}; 
    this.completePlans = this.completePlans.bind(this);
    this.uncheckPlans = this.uncheckPlans.bind(this);
    this.addPlans = this.addPlans.bind(this);
    this.deletePlans = this.deletePlans.bind(this);
    } 

    getInfo(entry) {
      var result = new Array();
      const info = localStorage.getItem(entry);
      if (info != null){
        result = JSON.parse(info);
      }
      return result;
    }

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
                  })
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
        for (var i=0; i<updatePlans.length; i++){
          updatePlans[i].id = i+1;
        }
    
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

    render() {


        return (
            <React.Fragment>
                <div className = "loginPage">
                    <div className = "navBarWrapper">
                        <NavBar switchPage={this.switchPage}/>
                    </div>

                    <div className = 'content'> 
                    {this.state.selector == 1 && (<Timeline journals={this.state.journals}/>)}
                    {this.state.selector == 2 && (<Plan plans={this.state.plans} completed={this.state.completed} 
                                                        completePlans={this.completePlans} uncheckPlans={this.uncheckPlans}
                                                        addPlans={this.addPlans}
                                                        deletePlans={this.deletePlans}
                                                        />)}
                    {this.state.selector == 3 && (<Journal completed={this.state.completed}/>)}

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