import React from 'react'
import './Plan.css'


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
        
        <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}>{plan.startTime.toString()}</td>
        <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}>{plan.endTime.toString()}</td>
        <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}>{plan.description.toString()}</td>
        <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}><input 
            type="checkbox" 
            checked={plan.checked}

            onChange={e => this.handleChange(e, plan.id, plan.checked)}
            /></td>
        <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}><input 
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

    componentDidMount(){
      this.setState({count:this.props.count});
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
          <div>
          <h5>Input start time, end time and description to add a new plan.</h5>
          <form name="addPlan" className="register" onSubmit={this.handleSubmit} style={{ "text-align": "center" }}>
            <input type="time" name="startTime" id="startTime" placeholder="Start" />
            <input type="time" name="endTime" placeholder="End" />
            <input id="description" name="description" style={{ "width": "260px", "height": "40px" }} placeholder="Enter description here..." />
            <button style={{ "width": "70px", "height": "42px" }}>Add</button><br></br>

            <div style={{ "overflow": "scroll" }}>
              <table className="bordered-table" style={{ "padding": "12px", "text-align": "center" }}>
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Description</th>
                    <th>Complete</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody style={{ "text-align": "center" }}>
                  <PlanRows plans={this.props.plans}
                    deletePlans={this.deletePlans}
                    completePlans={this.completePlans} uncheckPlans={this.uncheckPlans} />
                </tbody>
              </table>
            </div>

          </form>
          </div>
        )

    }
}