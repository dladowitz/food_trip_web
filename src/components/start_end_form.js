import React, { Component } from 'react';
import StepsList from './steps_list.js';

class StartEndForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLocation: 'San Francisco, CA',
      endLocation: 'Saratoga, CA',
      steps: []
    };
  }

  onInputChange(event) {
    if (event.target.name === 'startLocation') {
      this.setState({ startLocation: event.target.value, steps: [] });
    } else if (event.target.name === 'endLocation') {
        this.setState({ endLocation: event.target.value, steps: [] });
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
        this.setState({ steps: response.routes[0].legs[0].steps });
        console.log('state: ', this.state);
      } else {
        console.log('directionsService Error: ', response);
      }
    });
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


        <StepsList steps={this.state.steps} />
      </div>
    );
  }
}

export default StartEndForm;
