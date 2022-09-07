
const AnswerField = ({userInput, onAnswerChange, name}) => {
    const handleChange = (event) => {
        onAnswerChange(event.target.value, event.target.name)
    }
    return (
        <div class="container form-group">
            <input class="form-control" type="text" required 
                value={userInput} onChange={handleChange} name ={name}></input>
        </div>
    );
}

export default AnswerField;
