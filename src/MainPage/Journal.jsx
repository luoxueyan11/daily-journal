import React from 'react'
import TextEditor from './TextEditor'
import './Journal.css'

class JournalRows extends React.Component {
    constructor() {
      super(); 
    }

    handleEdit(e, id) {
      this.props.editJournal(id);
  }
  

    render() {
      const completed = this.props.completed;
      return (
        completed.map(p => 
          <tr>
            <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}>{p.startTime.toString()}</td>
            <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}>{p.endTime.toString()}</td>
            <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}>{p.description.toString()}</td>
            <td style={{"padding":"12px", "text-align":"center", "border":"2px solid #ddd"}}><input 
              type="button" 
              value="Edit"
              onClick={(e) => {
                this.props.switchPage(2);
                this.handleEdit(e, p.id)
              }}
              /></td>
          </tr>
        )
      )
    }
  }
  
export default class Journal extends React.Component{
    constructor() {
        super();
        this.state = { selector: 1, editingId:0}; 
        this.switchPage = this.switchPage.bind(this);
        this.editJournal = this.editJournal.bind(this);
      }

      editJournal(id) {
        this.setState({editingId:id})
      }

      setSelector(value){
        this.setState({selector:value});
        console.log(value);
      }
    
      switchPage(value){
        this.setSelector(value);
      }
    
      renderSwitch(param) {
        switch(param) {
          case 1:
            return (
              <div className="register-container">
              <h5>Check your journal lists, click Edit to write a corresponding journal.</h5>
              <form name="signup" className="register" style={{ "text-align": "center" }}>
              <div style={{ "overflow": "scroll" }}>
                <table className="bordered-table" style={{ "padding": "12px", "text-align": "center" }}>
                  <thead>
                    <tr>
                      <th>Start</th>
                      <th>End</th>
                      <th>Content</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                   <JournalRows completed={this.props.completed} switchPage={this.switchPage} editJournal={this.editJournal}/>
                  </tbody>
                  </table>
                  </div>
              </form>
            </div>
            );
          case 2:
            return (
              <div>
                <div>
                  Editor
                </div>
                <div><button onClick={(e) => {this.switchPage(1);}}>back</button></div>
                <div>
                  <TextEditor completed={this.props.completed} journalId={this.state.editingId} tracker={this.props.tracker} content={this.props.content}
                              setJournal={this.props.setJournal} setTracker={this.props.setTracker}/>
                </div>
              </div>
            );
        }
      }
    
      render() {
    
        return (
          <div>
            {this.renderSwitch(this.state.selector)}
          </div>
        );
      }
    }