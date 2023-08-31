import './Form.css'
import TextField from './components/TextField';

const Form = () => {
    return (
        <section>
            <form>
                <TextField label="Username" placeholder="Enter your username..." />
                <TextField label="Password" placeholder="Enter your password..." />
            </form>
        </section>
    )
}

export default Form;