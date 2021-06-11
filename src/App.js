import './App.css';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [user, setUser] = useState({ firstName: "ram", age: 34, gender: "Male" });
  const [users, setUsers] = useState([]);
  const handleEvent = e => {
    setUser( {...user, [e.target.name]: e.target.value });
  }
  const saveUser = () => {
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
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <label>Normal label</label>
        <Form.Label >Email address</Form.Label>
        <Form.Control name='firstName' onChange={handleEvent} value={user.firstName} placeholder="Enter firstName" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
      </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleEvent} value={user.age} type="number" placeholder="Age" name="age"/>
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check onChange={handleEvent} value='Male' inline label="Male" name="gender"
            type={type} id={`inline-${type}-1`} />
          <Form.Check onChange={handleEvent} inline value='Female' label="Female" name="gender"
            type={type} id={`inline-${type}-2`} />
          <Form.Check  inline disabled
            label="3(disabled)"
            type={type}
            id={`inline-${type}-3`}
          />
        </div>
      ))}
      <Button onClick={saveUser} variant="primary" type="button">
        Submit
    </Button>
    </Form>


  );
}


export default App;
