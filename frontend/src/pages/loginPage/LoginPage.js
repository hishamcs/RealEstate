import { Link, useNavigate } from 'react-router-dom'
import './loginPage.scss'
import FormInput from '../../components/formInput/FormInput'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/userActions'
import toast from 'react-hot-toast'




const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const onChange = (e) => {
        e.preventDefault()
        setValues({...values, [e.target.name]: e.target.value})
    }

    const inputs = [
        {
            id:1,
            name:'email',
            type: 'email',
            errorMessage: 'Enter a valid email',
            placeholder: 'Email',
            required:true
        },
        {
            id:2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            }
    ]

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await dispatch(login(values.email, values.password))
            navigate('/home')
        } catch(error) {
            toast.error(error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
            )
        }
    }
    return(
        <div className="login">
            <div className='container'>
                <h1>REALESTATE</h1>
                <form onSubmit={handleSubmit}>
                    {inputs.map(input=> (
                        <FormInput {...input} key={input.id} value={values[input.name]} onChange={onChange} />
                    ))}
                    <div style={{display:"flex", gap:"10px", justifyContent:"space-between", width:"100%"}}>
                    </div>
                    <button>Login</button>
                </form>
                <p>Don't have account ? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}


export default LoginPage