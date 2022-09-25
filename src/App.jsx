/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
  {
    id: 3, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
    const traveller = props;
    function To2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    const bookingTime = traveller.bookingTime.getFullYear() + '-' + To2Digits(traveller.bookingTime.getMonth() + 1) + '-' + To2Digits(traveller.bookingTime.getDate()) + " " + To2Digits(traveller.bookingTime.getHours()) + ':' + To2Digits(traveller.bookingTime.getMinutes()) + ':' + To2Digits(traveller.bookingTime.getSeconds());

  return (
    <tr key={traveller.id}>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    <td>{traveller.id}</td><td>{traveller.name}</td><td>{traveller.phone}</td><td>{bookingTime}</td>
    </tr>
  );
}

function Display(props) {
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellers = props.travellers;
  const travellerRows =  travellers.map(traveller => ((traveller!="") && TravellerRow(traveller)));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellerRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const newName = form.travellername.value;
    const newPhone = form.travellerphone.value;
    function minFreeId(a){
      for (let index in a){
        if(a[index] == "") {
          return Number(index)+1;
        }
      }
      return Number(a.length)+1;
    }
    const newId = minFreeId(this.props.travellers);
    const newBookingTime = new Date(); 
    const newTraveller = {id:newId, name:newName, phone:newPhone, bookingTime:newBookingTime};
    this.props.bookTraveller(newTraveller);
    form.travellername.value = "";
    form.travellerphone.value = "";
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const deleteId = form.travellerid.value;
    const deleteName = form.travellername.value;
    const deletePhone = form.travellerphone.value;
    const deleteBookingTime = form.travellerbookingtime.value;
    const deletetraveller = {id:deleteId, name:deleteName, phone:deletePhone, bookingTime:deleteBookingTime};
    this.props.deleteTraveller(deletetraveller);
    form.travellerid.value = "";
    form.travellername.value = "";
    form.travellerphone.value = "";
    form.travellerbookingtime.value = "";
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellerid" placeholder="Id" />
        <input type="text" name="travellername" placeholder="Name (optional)" />
        <input type="text" name="travellerphone" placeholder="Phone (optional)" />
        <input type="text" name="travellerbookingtime" placeholder="BookingTime (optional)" />
        <button>Delete</button>
      </form>
    );
  }
}

function calcLeftTicket(props){
  var left = 0;
  for (let index in props){
    if(props[index] == "") {
      left = left + 1;
    }
  }
  return 10 - props.length + left;
}

function VisualColor(props) //return a className list to visualize reservation
{
  const temp = props;
  var colorList = [];
  for(var i=0; i<10; i++){
    if((temp.length <= i) || (temp[Number(i)]==="")){
      colorList.push("VisualFree");
    }
    else colorList.push("VisualBusy");
  }
  return colorList;
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    const classNameColor = VisualColor(this.props.travellers);
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	  The number of the empty seats is: {calcLeftTicket(this.props.travellers)}. <br></br>The Visual Representation of reserved/unreserved tickets are as follows, where orange represents an occupied seat and grey represents an empty seat.
    <table className="VisualTable">
    <caption>Visualization of Reserved Tickets</caption>
      <tbody>
        <tr><td className={classNameColor[0]}>1</td>
            <td className={classNameColor[1]}>2</td></tr>
            <tr><td className={classNameColor[2]}>3</td>
            <td className={classNameColor[3]}>4</td></tr>
        <tr><td className={classNameColor[4]}>5</td>
            <td className={classNameColor[5]}>6</td></tr>
        <tr><td className={classNameColor[6]}>7</td>
            <td className={classNameColor[7]}>8</td></tr>
        <tr><td className={classNameColor[8]}>9</td>
            <td className={classNameColor[9]}>10</td></tr>
      </tbody>
    </table>
  </div>);
	}
}

class TicketToRide extends React.Component {
  constructor() { 
    super();
    this.state = { travellers: [], selector: 1}; 
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({selector:value});
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() { 
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
    
    //this.setState({ travellers: initialTravellers });
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      const temp = this.state.travellers;
      const index = passenger["id"] - 1;
      //alert an error when booking number>10
      if(index>=10){
        alert("Error! No seat left!");
        return;
      }
      temp[index] = passenger;
      this.setState({travellers: temp});
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const temp = this.state.travellers;
    const index = passenger["id"]-1;
    //alert an error when deleteId is invalid
    if(index >= temp.length || temp[index]==""){
      alert("Error! Please input a valid ID!");
      return;
    }
    temp.splice(index,1,"");
    this.setState({travellers: temp});
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
        <button onClick={()=>{this.setSelector(1)}}>Homepage</button>
        <button onClick={()=>{this.setSelector(2)}}>Display</button>
        <button onClick={()=>{this.setSelector(3)}}>Add</button>
        <button onClick={()=>{this.setSelector(4)}}>Delete</button>
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
    {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{this.state.selector == 1 && (<Homepage travellers={this.state.travellers}/>)}
    
    {/*Q3. Code to call component that Displays Travellers.*/}
    {this.state.selector == 2 && (<Display travellers={this.state.travellers}/>)}
		
    {/*Q4. Code to call the component that adds a traveller.*/}
    {this.state.selector == 3 && (<Add travellers={this.state.travellers} bookTraveller={this.bookTraveller}/>)}

		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector == 4 && (<Delete deleteTraveller={this.deleteTraveller}/>)}

	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
