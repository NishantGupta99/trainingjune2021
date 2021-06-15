
import React, { useState } from 'react';
import { Button, Form,ListGroup } from 'react-bootstrap';
import axios from 'axios';

const UserForm = () => {
    const [user, setUser] = useState({ firstName: "ram", age: 34, gender: "Male", skills: [] });
    const [users, setUsers] = useState([]);


    function getAllUsers() {
        axios.get('http://localhost:4200/users')
            .then(function (response) {
                // handle success
                console.log(response.data);
               setUsers(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });


    }
   
    getAllUsers();
    const handleEvent = e => {
        if (e.target.type === 'checkbox') {
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
        <div>
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
                    <Form.Control onChange={handleEvent} value={user.age} type="number" placeholder="Age" name="age" />
                </Form.Group>
                {['checkbox'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check onChange={handleEvent} value='Java' inline label="Java" name="skills"
                            type={type} id={`inline-${type}-1`} />
                        <Form.Check onChange={handleEvent} inline value='Javascript' label="Javascript" name="skills"
                            type={type} id={`inline-${type}-2`} />
                        <Form.Check inline disabled
                            label="3(disabled)"
                            type={type}
                            id={`inline-${type}-3`}
                        />
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
                <Button onClick={saveUser} variant="primary" type="button">
                    Submit
                </Button>
                <ListGroup>
                  { users.map((user,index)=>{
                       return  <ListGroup.Item>{user.firstName}</ListGroup.Item>
                   })}
                  
                </ListGroup>

            </Form>

        </div>
    )
}
export default UserForm;

