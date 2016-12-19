import React from 'react';
import Step from './step.js';

const StepsList = (props) => {
  console.log('StepList props: ', props);
  const steps = props.steps.map((step) => {
    return <Step step={step} />;
  });

  return (
    <ul className='col-md-12 list-group'>
      {steps}
    </ul>
  );
};

export default StepsList;
