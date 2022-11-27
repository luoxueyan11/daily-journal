import React from 'react'
import NavBar from './NavBar2'
import Footer from '../Homepage/Footer'



const initialPlan = [
    {
      id : 1,
      startTime : "10:00 am",
      endTime : "11:00 am",
      description: "This is a task",
      checked: false
    },
    {
      id : 2,
      startTime : "14:00 pm",
      endTime : "16:00 pm",
      description: "This is a task",
      checked: false
    },
  ]

class PlanRows extends React.Component {
constructor() {
    super(); 
}

handleChange(e, id,checked) {
    if (!checked){
    this.props.completePlans(id);
    } else {
    this.props.uncheckPlans(id);
    }
}

handleDelete(e, id) {
    this.props.deletePlans(id);
}

render() {
    const plans = this.props.plans;
    return (
    plans.map(plan => 
        <tr>
        <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.id.toString()}</td>
        <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.startTime.toString()}</td>
        <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.endTime.toString()}</td>
        <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}>{plan.description.toString()}</td>
        <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}><input 
            type="checkbox" 
            checked={plan.checked}
            //value={plan.id}
            onChange={e => this.handleChange(e, plan.id, plan.checked)}
            /></td>
        <td style={{"padding":"8px", "text-align":"center", "border-bottom":"1px solid #ddd"}}><input 
            type="button" 
            value="Delete"
            onClick={e => this.handleDelete(e, plan.id)}
            /></td>
        </tr>
    )
    )
}
} 
  
export default class Plan extends React.Component{
    constructor() {
        super(); 
        this.state = {count: 0};
        this.completePlans = this.completePlans.bind(this);
        this.deletePlans = this.deletePlans.bind(this);
        this.uncheckPlans = this.uncheckPlans.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    completePlans(id){
    this.props.completePlans(id);
    }

    deletePlans(id){
    this.props.deletePlans(id);
    }

    uncheckPlans(id){
    this.props.uncheckPlans(id);
    }

    handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.addPlan;
    const newStartTime = form.startTime.value;
    const newEndTime = form.endTime.value;
    const newDescription = form.description.value;
    let newPlan = {id: this.state.count + 1,
                  startTime: newStartTime, 
                  endTime: newEndTime, 
                  description: newDescription, 
                  checked: false};
    this.props.addPlans(newPlan);
    this.setState({count: this.state.count+1});
    form.startTime.value = "";
    form.endTime.value = "";
    form.description.value = "";
    }


    render() {

        return (
            <React.Fragment>
                <div className = "loginPage">


                    <div className = 'content'> 
                    <div className="register-container">
        <form name="addPlan" className="register" onSubmit={this.handleSubmit}>
          <p>Input start time, end time and description to add a new plan.</p>
          <input type="time" name="startTime" id="startTime" placeholder="Start Time" /><br></br>
          <input type="time" name="endTime" placeholder="End Time" /><br></br>
          <input id="description" name="description" style={{"width": "300px", "height": "60px"}} placeholder="Enter description here..."/><br></br>
          <button>Add New Plan</button><br></br>

            <table className="bordered-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Description</th>
                <th>Completion Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <PlanRows plans={this.props.plans} 
                        deletePlans={this.deletePlans}
                        completePlans={this.completePlans} uncheckPlans={this.uncheckPlans}/>
            </tbody>
            </table>
        </form>
      </div>

                    </div>
                    <div class = "footerWrapper"> 
                        {/* <Footer /> */}
                    </div>
                </div>
            </React.Fragment>
        )

    }
}