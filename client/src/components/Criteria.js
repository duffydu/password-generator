import 'bootstrap/dist/css/bootstrap.min.css'
import LengthCriteria from './LengthCriteria'
const Criteria = ({ description, id, onCheckBoxChange}) => {
    const handleCheckBoxChange = (event) => {
        console.log("handling checkbox change");
        console.log(event.target.checked);
        console.log(event.target.id);
        onCheckBoxChange(event.target.checked, event.target.name);
    }
    return (
        <div>
            <div class = "form-group mb-3">
                <input class="form-check-input" type="checkbox" value="" id={description} name={id} onChange={handleCheckBoxChange} />
                <label class="form-check-label" htmlFor={description}>
                    {id == "len" && <LengthCriteria text={description}/>}
                    {id != "len" && description}
                </label>
            </div>
        </div>
    )
}

export default Criteria
