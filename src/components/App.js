import React, { Component } from "react";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      value: "",
      pilot: ""
    };
  }
  handleNameChange(event) {
    var pilot = this.state.pilot;
    pilot = event.target.value;
    this.setState({ pilot });
  }
  handleSubmit(event) {
    event.preventDefault();
    return this.setState({ pilot: this.state.pilot });
  }
  componentDidMount() {
    let update = localStorage.getItem("vehicles");
    this.setState({ savedVehicles: update });
    console.log("did", this.state);
    fetch("https://swapi.co/api/vehicles/")
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        let vehicles = data.results;
        this.setState({ vehicles });
        console.log(vehicles);
      });
  }
  render() {
    // Making cards for the vehicles
    let divs = this.state.vehicles.map(vehicle => {
      return (
        <div className="col-sm-4" key={vehicle.name}>
          <div
            className="card"
            key={vehicle.name}
            style={{ width: 20 + "rem" }}
          >
            <div className="card-block">
              <h4 className="card-title">{vehicle.name}</h4>
              <p className="card-subtitle mb-2 text-muted">
                Model: {vehicle.model}
              </p>
            </div>
            <div className="card" style={{ width: 18 + "rem" }}>
              <div className="card-subtitle mb-2 text-muted">Specs</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Manufacturer: {vehicle.manufacturer}
                </li>
                <li className="list-group-item">
                  Class:{vehicle.vehicle_class}
                </li>
                <li className="list-group-item">
                  Passengers:{vehicle.passengers}
                </li>
                <li className="list-group-item">Crew:{vehicle.crew}</li>
                <li className="list-group-item">Length:{vehicle.length}</li>
                <li className="list-group-item">
                  MaxSpeed:{vehicle.max_atmosphering_speed}
                </li>
                <li className="list-group-item">
                  Cargo Capacity:{vehicle.cargo_capacity}
                </li>

              </ul>
              <div className="card-block" />
            </div>
          </div>
        </div>
      );
    });
    return (
      // Page Header Section
      (
        <div className="App">
          <div className="jumbotron">
            <h1>Star Wars</h1>
            <p>The vehicles of the Star Wars</p>
          </div>
          {/*Form Section*/}
          <div className="form-group form">
            <h3>What's your name pilot?</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input
                name="pilot"
                onChange={this.handleNameChange.bind(this)}
                type="text"
                value={this.state.pilot}
              />
              <br />
              <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
            {this.state.pilot}
          </div>
          <div className="row">{divs}</div>
        </div>
      )
    );
  }
}

export default App;
