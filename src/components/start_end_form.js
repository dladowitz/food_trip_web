import React, { Component } from 'react';
import _ from 'lodash';

class StartEndForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLocation: 'San Francisco, CA',
      endLocation: 'Saratoga, CA',
      directions: null
    };
  }

  onInputChange(event) {
    if (event.target.name === 'startLocation') {
      this.setState({ startLocation: event.target.value });
    } else if (event.target.name === 'endLocation') {
        this.setState({ endLocation: event.target.value });
    }

    console.log('State: ', this.state);
  }

  onSubmit(event) {
    event.preventDefault();
    this.getDirections();
  }


  getDirections() {
    const directionsService = new google.maps.DirectionsService();
    const request = this.request();

    directionsService.route(request, (response, status) => {
      console.log('Returning from directionsService');
      if (status === 'OK') {
        this.setState({ directions: response.routes[0].legs[0] });
        console.log('state: ', this.state);
      } else {
        console.log('directionsService Error: ', response);
      }
    });
  }

  steps() {
    if (this.state.directions) {
      console.log('rendering steps');
      this.state.directions.steps.map((step) => {
        // return <li>{step.start_location.lat.name}</li>;
        console.log('iterating over step');
        return <li>lat: 100</li>;
      });
    } else {
      console.log('not rendering steps');
    }
  }

  request() {
    return {
      origin: this.state.startLocation,
      destination: this.state.endLocation,
      provideRouteAlternatives: false,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(/* now, or future date */),
        trafficModel: 'pessimistic'
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor='startLocation'>
            Start Location:
            <input
              type="text"
              name='startLocation'
              value={this.state.startLocation}
              onChange={this.onInputChange.bind(this)}
            />
          </label>

          <br />

          <label htmlFor='endLocation'>
            End Location:
            <input
              type="text"
              name='endLocation'
              value={this.state.endLocation}
              onChange={this.onInputChange.bind(this)}
            />
          </label>

          <br />
          <input type="submit" value="Submit" onPress />
        </form>


        <ul>
          <li> Steps: </li>
          {this.steps()}
        </ul>
      </div>
    );
  }
}

export default StartEndForm;
