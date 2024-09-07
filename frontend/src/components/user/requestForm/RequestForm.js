import { useState } from 'react'
import './requestForm.scss'
import axiosInstance from '../../../axios'
import toast from 'react-hot-toast'



const RequestForm = ({setOpen, property_id}) => {

    const [description, setDescription] = useState('')
    const [type, setType] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('maintenance_type', type)
        formData.append('description', description)
        formData.append('propty', property_id)

        try {

            const {data} = await axiosInstance.post('property/maintenance/', formData) 
            toast.success('Submitted your request')
            setOpen(false)
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <div className="requestFrom">
            <div className='modal'>
                <span className='close' onClick={()=>setOpen(false)}>x</span>
                <h1>Maintenance Request</h1>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <label>Maintenance Type</label>
                        <select
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                            required
                        >
                            <option value='' disabled hidden >---Select type---</option>
                            <option value='plumbing'>Plumbing</option>
                            <option value='electrical'>Electrical</option>
                            <option value='roofing'>Roofing</option>
                            <option value='painting'>Painting</option>
                            <option value='general_repairs'>General Repairs</option>
                            
                        </select>
                    </div>

                    <div className='item'>
                        <label>Description</label>
                        <textarea 
                            rows='4' 
                            placeholder='Enter the description' 
                            required
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RequestForm