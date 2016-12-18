import React from 'react';

const Step = (props) => {
  console.log('State props: ', props.step.start_location.lng());
  return <li>LAT: {props.step.start_location.lat()} / LNG: {props.step.start_location.lng()} </li>;
};

export default Step;
  
