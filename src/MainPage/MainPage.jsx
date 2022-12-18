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

/*
this part is for graphql query.
*/
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}
/* end of graphql query function */

class MainPage extends React.Component {
    constructor(){
    super();
    this.switchPage = this.switchPage.bind(this);
    this.state = {data:[],plans:[], completed:[], selector: 1, journals:[], content: [], tracker: [],username:"", count:0}; 
    this.completePlans = this.completePlans.bind(this);
    this.uncheckPlans = this.uncheckPlans.bind(this);
    this.addPlans = this.addPlans.bind(this);
    this.addJournal = this.addJournal.bind(this);
    this.deleteJournal = this.deleteJournal.bind(this);
    this.deletePlans = this.deletePlans.bind(this);
    this.setJournal = this.setJournal.bind(this);
    this.setTracker = this.setTracker.bind(this);
    } 

    async componentDidMount() {
      await this.loadData();
      // const userSpace = this.getUserSpace(this.props.user);
      // const userSpace = this.state.data.find(u => u.user == this.props.user);
      // if(userSpace){
      //   console.log("load Userspace...",userSpace);
      //   this.setState({plans:userSpace.plans,
      //                 completed:userSpace.completed,
      //                 journals:userSpace.allJournals,
      //                 username:userSpace.username,
      //                 email:userSpace.user,
      //                 count:userSpace.count
      //               })
      // } else {
      //   console.log("failed to get userspace");
      // }

    }

    async loadData() {
      const dataquery = `query {
        listData {
          user
          username
          plans{
            id startTime endTime description checked}
          completed{
            id startTime endTime description checked}
          allJournals{
            id startTime endTime description content}
          count
        }
      }`;
      const result = await graphQLFetch(dataquery);
      if (result) {
        this.setState({ data: result.listData});
        const data = this.state.data;
        const userdata = data.find(u => u.user == this.props.user);
        console.log("this.state.data:",data);
        this.setState({plans:userdata.plans});
        this.setState({completed:userdata.completed});
        this.setState({journals:userdata.allJournals});
        this.setState({count:userdata.count});
        this.setState({username:userdata.username});
        this.setState({email:userdata.user});
        // console.log(this.state.plans);
        // console.log(this.state.completed);
        console.log("this.state.data.plans:",userdata.plans);
        console.log("this.state.data.allJournals:",userdata.allJournals);
        console.log("this.state.journals:",this.state.journals);

        //  plans: data.listData.plans,
        //  completed: data.listData.completed,
        //  journals: data.listData.allJournals
      };
      console.log("load data...",this.state.data);  
    }

    // /*get corresponding user workspace for the current user from mongodb*/
    // getUserSpace(useremail){
    //   const data = this.state.data;
    //   const result = data.find(u => u.user == useremail);
    //   return result
    // }

    getInfo(entry) {
      var result = new Array();
      const info = localStorage.getItem(entry);
      if (info != null){
        result = JSON.parse(info);
      }
      return result;
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

    // update user plans in database
    async addOnePlan(data) {
      const query = `mutation addOnePlan($email:String!, $data:[InputPlan]!) {
        addOnePlan(email:$email, data:$data)}`;
      const email = this.state.email;
      const result = await graphQLFetch(query, {email, data});
      if (result){
        console.log("updatePlan: ready to load data.")
        this.loadData();
        console.log("updatePlan: complete loading data.")
      }
    }

    async updatePlan(data) {
      const query = `mutation updatePlan($email:String!, $data:[InputPlan]!) {
        updatePlan(email:$email, data:$data)}`;
      const email = this.state.email;
      const result = await graphQLFetch(query, {email, data});
      if (result){
        console.log("updatePlan: ready to load data.")
        this.loadData();
        console.log("updatePlan: complete loading data.")
      }
    }

    async updateCompleted(data) {
      const query = `mutation updateCompleted($email:String!, $data:[InputCompleted]!) {
        updateCompleted(email:$email, data:$data)}`;
      const email = this.state.email;
      const result = await graphQLFetch(query, {email, data});
      if (result){
        this.loadData();
      }
    }


    switchPage(selector){
        console.log(selector);
        this.setState({selector:selector})
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



    async addPlans(plan){
        const temp = this.state.plans;
        temp.push(plan);
        // this.setState({plans:temp});
        // this.updateLocalStorage("plans",temp);
        // console.log(temp)

        await this.addOnePlan(temp);
        console.log("addPlans:",this.state.plans);
      }
    
    async deletePlans(id){
      console.log("delete:",id,"; plans:",this.state.plans);
      await this.uncheckPlans(id);
      const plans = this.state.plans;
      const updatePlans = plans.filter(function(plan){
        return plan.id != id;
      })
      console.log("after deleting:",updatePlans);
      await this.updatePlan(updatePlans);
      const journalNeedsDel = this.state.journals.filter(obj => obj.id === id)
      if (journalNeedsDel.length > 0) {
        this.deleteJournal(id);
      };
      // this.setState({plans:updatePlans});
      // this.updateLocalStorage("plans",updatePlans);
      
    }
    
    async completePlans(id){
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
          // this.updateLocalStorage("plans", this.state.plans);
          await this.updatePlan(this.state.plans);
          console.log("complete updating plan.")
          temp.push(newComplete);
          
        }
      }
      // this.setState({completed: temp.sort((a, b) => (a.id > b.id) ? 1 : -1)}, function () {
      //   console.log("check a plan");
      // });
      // this.updateLocalStorage("completed",temp.sort((a, b) => (a.id > b.id) ? 1 : -1));
      await this.updateCompleted(temp.sort((a, b) => (a.id > b.id) ? 1 : -1));

      
    }
    
    async uncheckPlans(id){
      const plans = this.state.plans;
      const temp = this.state.completed;
      const updateComplete = temp.filter(function(plan){
        return plan.id != id;
      })
    //   this.setState({completed: updateComplete}, function () {
    //     console.log("uncheck a plan");
    // });
      await this.updateCompleted(updateComplete);
      // this.updateLocalStorage("completed",updateComplete);
  
      
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
          await this.updatePlan(plans);
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
                    {this.state.selector == 2 && (<Plan plans={this.state.plans} completed={this.state.completed} count={this.state.count}
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