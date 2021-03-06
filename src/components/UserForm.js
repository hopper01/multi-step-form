// import React from 'react'

// const UserForm = (props) => {
//   const { initialState } = props;
//   const handleChange = (input) => {
//     -> set the new state in the store
//   }
//   return (
//     <>
//       {props.children}
//     </>
//   )
// }

// export default UserForm

import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';

// interface for the localstorage
const testFormDataObj = {
  step: 1,
  firstName: '',
  lastName: '',
  email: '',
  occupation: '',
  city: '',
  bio: '',
};

export class UserForm extends Component {
  constructor(props) {
    if ('testFormData' in localStorage) {
      const formData = JSON.parse(localStorage.getItem('testFormData'));
      var { step, firstName, lastName, email, occupation, city, bio } =
        formData;
    } else {
      localStorage.setItem('testFormData', JSON.stringify(testFormDataObj));
    }
    super(props);
    this.state = {
      step: step || 1,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      occupation: occupation || '',
      city: city || '',
      bio: bio || '',
    };
  }
  updateStepInLocalStorage = step => {
    const formData = JSON.parse(localStorage.getItem('testFormData'));
    formData['step'] = step;
    localStorage.setItem('testFormData', JSON.stringify(formData));
  };
  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
    this.updateStepInLocalStorage(step + 1);
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
    this.updateStepInLocalStorage(step - 1);
  };

  // Handle fields change
  handleChange = input => e => {
    const value = e.target.value;
    this.setState({ [input]: value });
    const formData = JSON.parse(localStorage.getItem('testFormData'));
    formData[input] = value;
    localStorage.setItem('testFormData', JSON.stringify(formData));
  };
  render() {
    const { step } = this.state;
    const { firstName, lastName, email, occupation, city, bio } = this.state;
    const values = { firstName, lastName, email, occupation, city, bio };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
        console.log('This is a multi-step form built with React.');
    }
  }
}

export default UserForm;
