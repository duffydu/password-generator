import AnswerField from "./AnswerField"
import CategoryQuestionDropdowns from "./Dropdowns/CategoryQuestionDropdowns";


const ChosenQuestions = ({display_text, userInput, onAnswerChange, name}) => {
    return (
        <div class="row">
            <div class="col mb-4">
                <div class="card">
                    <h4 class="card-header">{display_text}</h4>
                    <div class="card-body">
                        <CategoryQuestionDropdowns />
                        <AnswerField userInput={userInput} onAnswerChange={onAnswerChange} name = {name}/>
                    </div>
                </div>
            </div>
        </div>  )
}

export default ChosenQuestions
