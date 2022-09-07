import Header from './components/Header';
// // import Button from './components/Button';
import Criteria from './components/Criteria';
import ChosenQuestions from './components/ChosenQuestions';
import { Button, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import PasswordDisplay from './components/PasswordDisplay';
import Forms from './components/Forms';
 
function App() {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     passwords: [], 
  //     error: null
  //   }   
  // }
  var formAns;
  const [data, setData] = useState([{}]);
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [length, setLength] = useState('False');
  const [symbols, setSymbols] = useState('False');
  const [numbers, setNumbers] = useState('False');
  const [upperCase, setUpperCase] = useState('False');
  const [ambiguous, setAmbiguous] = useState('False');
  // const [generate, setGenerate] = useState('')

  // useEffect(() => {
  //   fetch('/passwords') 
  //   .then(res => res.json())
  //   .then((data) => {
  //     // console.log(data);
  //     // console.log(data.passwords); 
  //     setData(data.passwords);
  //   })
  //   // .catch(error => {
  //   //   this.setState({error: error})
  //   // })
  // }, [])

  const handleAnswerChange = (inputValue, ansName) => {
    if (ansName === "ans1") {
      setAnswer1(inputValue);
      console.log("ans1 " + answer1);
    } else if (ansName === "ans2"){
      setAnswer2(inputValue);
      console.log("ans2 " + answer2);
    } else if (ansName === "ans3") {
      setAnswer3(inputValue);
      console.log("ans3 " + answer3);
    }
  }

  const handleCheckBoxChange = (value, id) => {
    console.log("handling checkbox change in app.js");
    if (id === "len"){
      setLength(value);
    } else if (id === "incl_sym"){
      setSymbols(value);
    } else if (id === "incl_num"){
      setNumbers(value);
    } else if (id === "incl_upp"){
      setUpperCase(value);
    } else if (id === "excl_amb"){
      setAmbiguous(value);
    }
  } 

  const handleSubmit = (e) => {
    formAns = {answer1, answer2, answer3, length, symbols, numbers, upperCase, ambiguous};
    console.log(formAns);
    console.log(e);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formAns)
    }

    fetch('/passwords/generate', requestOptions)
    .then(res => res.json())
    .then((data) => {
      setData(data.passwords);
    })
    console.log("submitted");
  }
  

  return (
    <div className="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">Password Generator</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Container>
        <Header />
        <h4>Generate a new password by selecting 3 questions below:</h4>
        <Row>
          <Col>
            <ChosenQuestions display_text="Question 1:" userInput={answer1} onAnswerChange={handleAnswerChange} name="ans1" />
            <ChosenQuestions display_text="Question 2:" userInput={answer2} onAnswerChange={handleAnswerChange} name="ans2"/>
            <ChosenQuestions display_text="Question 3:" userInput={answer3} onAnswerChange={handleAnswerChange} name="ans3"/>
          </Col>
          <Col>
            {/* <Form>
              <h3>Specify what's needed in your password:</h3>
              <Criteria description="length (e.g. 8, 12)" id="len" />
              <Criteria description="Include symbols (e.g. @$)" id='incl_sym'/>
              <Criteria description="Include numbers (e.g. 123)" id='incl_num'/> */}
              {/* <Criteria description="Include lowercase characters (e.g. abc)" id='incl_low'/> */}
              {/* <Criteria description="Include uppercase characters (e.g. ABC)" id='incl_upp'/>
              <Criteria description="Exclude ambiguous characters numbers (e.g. {},[])" id='excl_amb'/> 
              <Button>Generate Password</Button>
            </Form> */}
            <Forms onSubmit={handleSubmit} onCheckBoxChange={handleCheckBoxChange}/>
            <PasswordDisplay data={data}/>
            {/* {this.state.error && <h3>{this.state.error}</h3>} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
  
}

export default App;
