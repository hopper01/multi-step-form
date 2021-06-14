import './App.css';
import { UserForm } from './components/UserForm';
import React, { useEffect } from 'react';
// interface for the localstorage
const testFormDataObj = {
  firstName: '',
  lastName: '',
  email: '',
  occupation: '',
  city: '',
  bio: '',
};
function App() {
  useEffect(() => {
    if("testFormData" in localStorage) return;
    localStorage.setItem('testFormData', JSON.stringify(testFormDataObj));
  }, []);

  
  return (
    <div className="App">
      <header className="App-header">
        Multi-Step FORM
      </header>
      <UserForm />
    </div>
  );
}

export default App;
