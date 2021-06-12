import './App.css';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [user, setUser] = useState({ firstName: "", age: 34, gender: "Male", skills: [] });
  const [users, setUsers] = useState([]);
  const [ errors, setErrors ] = useState([]);
  const handleEvent = e => {
    e.preventDefault()
    
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[e.target.name] ) setErrors({
      ...errors,
      [e.target.name]: null
    })
    
    if (e.target.type == 'checkbox') {
      const target = e.target;
      if (e.target.checked) {
        //add values here
        user[target.name].push(target.value);
      } else {
        //when user deselects       
        let i = -1;
        user[target.name].map((value, index) => {
          if (value == target.value) {
            i = index;
          }
        });
        if (i > -1) {
          user[target.name].splice(i, 1);
        }
      }
      setUser({ ...user, [e.target.name]: user.skills });
    } else
      setUser({ ...user, [e.target.name]: e.target.value });
  }
  const saveUser = () => {
    const newErrors = findFormErrors();
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
      return
    }
    const promise = fetch('http://localhost:4200/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    promise.then((response) => {
      console.log(response);
    })
  }
  /*const setField = (field, value) => {
    setUser({
      ...user,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }*/
  

  const findFormErrors = () => {
    const newErrors ={}
    if( !user.firstName || user.firstName=== '') newErrors.firstName = 'this field cannot be blank'
    else if ( user.firstName.length > 30) newErrors.firstName = "the name is too big"
    return newErrors
  }
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <label>Normal label</label>
        <Form.Label >Email address</Form.Label>
        <Form.Control name='firstName' onChange={handleEvent} value={user.firstName} placeholder="Enter firstName" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Control.Feedback type='invalid'> {errors.firstName} </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleEvent} value={user.age} type="number" placeholder="Age" name="age" />
      </Form.Group>
      {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check onChange={handleEvent} value='Java' inline label="Java" name="skills"
            type={type} id={`inline-${type}-1`} />
          <Form.Check onChange={handleEvent} inline value='Javascript' label="Javascript" name="skills"
            type={type} id={`inline-${type}-2`} />

        </div>
      ))}
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check onChange={handleEvent} value='Male' inline label="Male" name="gender"
            type={type} id={`inline-${type}-1`} />
          <Form.Check onChange={handleEvent} inline value='Female' label="Female" name="gender"
            type={type} id={`inline-${type}-2`} />
        </div>
      ))}
      <Button onClick={saveUser} variant="primary" type="button" >
        
        Submit
      </Button>
    </Form>
  );
}


export default App;
