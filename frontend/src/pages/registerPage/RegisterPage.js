import { useState } from 'react'
import FormInput from '../../components/formInput/FormInput'
import './registerPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axiosInstance from '../../axios'



const Register = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        password:"",
        confirmPassword:""

    })

    const inputs = [
        {
            id:1,
            name: 'name',
            type: 'text',
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character and number",
            placeholder: 'UserName',
            pattern: "^[A-Za-z]{3,16}$",
            required: true,
        },
        {
            id:2,
            name: 'email',
            type: 'email',
            errorMessage: 'Enter a valid email',
            placeholder: 'Email',
            required: true,
        },
        {
            id:3,
            name: 'phoneNumber',
            type: 'text',
            errorMessage: 'Enter a valid phone number',
            placeholder: 'Phone Number',
            pattern: `^\\d{10}$`,
            required: true,
        },
        {
            id:4,
            name: 'password',
            type: 'password',
            errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character',
            placeholder: 'Password',
            pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id:5,
            name: 'confirmPassword',
            type: 'password',
            errorMessage: "Passwords don't match",
            placeholder: 'Confirm Password',
            pattern: values.password,
            required: true,
        },
        
    ]

    const onChange = (e) => {
        setValues({...values,[e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            
            await axiosInstance.post('user/register/', {'email':values.email, 'username':values.name, 'password':values.password, 'phone_number':values.phoneNumber})
            toast.success('Account created successfully...')
            navigate('/')
        } catch(error) {
            if(error.response.data) {
                Object.values(error.response.data).forEach(value=> {
                    toast.error(value)
                })
            }
        }
    }


    return (
        <div className="register">
            <div className='container'>
                <h1>REALESTATE</h1>
                <form onSubmit={handleSubmit}>
                    {inputs.map(input=> (
                        <FormInput {...input} key={input.id} value={values[input.name]} onChange={onChange}/>
                    ))}
                    <button>Register</button>
                </form>
                <Link to='/'>Already have an account</Link>
            </div>
        </div>
    )
}

export default Register