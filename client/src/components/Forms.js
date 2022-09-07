import { Button, Form } from 'react-bootstrap';
import Criteria from './Criteria';
// import Button from './Button';
import React, {useState} from 'react';

const Forms = ({onSubmit, onCheckBoxChange}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handling submit");
        onSubmit();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
              <h3>Specify what's needed in your password:</h3>
              <Criteria description="length (e.g. 8, 12)" id="len" onCheckBoxChange={onCheckBoxChange}/>
              <Criteria description="Include symbols (e.g. @$)" id='incl_sym' onCheckBoxChange={onCheckBoxChange}/>
              <Criteria description="Include numbers (e.g. 123)" id='incl_num' onCheckBoxChange={onCheckBoxChange}/>
              {/* <Criteria description="Include lowercase characters (e.g. abc)" id='incl_low'/> */}
              <Criteria description="Include uppercase characters (e.g. ABC)" id='incl_upp' onCheckBoxChange={onCheckBoxChange}/>
              <Criteria description="Exclude ambiguous characters numbers (e.g. {},[])" id='excl_amb' onCheckBoxChange={onCheckBoxChange}/> 
              <Button type="submit">Generate Password</Button>
            </form>
        </div>
    )
}

export default Forms