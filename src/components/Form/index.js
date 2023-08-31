import TextField from '../TextField'
import './Form.css'


const Form = () => {
    return (
        <section className="form">
            <form>
                <h2>Enter your credentials</h2>
                <TextField label="Username" placeholder="Enter your username..." />
                <TextField label="Password" placeholder="Enter your password..." />
                <button>Login</button>
            </form>
        </section>
    )
}

export default Form;