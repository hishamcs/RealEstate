import { useState } from 'react'
import './addProperty.scss'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addProperty } from '../../../redux/actions/propertyActions'




const AddProperty = ({setOpen, slug, columns}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [sqFeet, setSqFeet] = useState('')
    const [bedRoom, setBedRoom] = useState('')
    const [bathRoom, setBathRoom] = useState('')

    const [propertyFor, setPropertyFor] = useState('')
    const [coverPic, setCoverPic] = useState(null)
    
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('address', address)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('sq_feet', sqFeet)
        formData.append('bed_room', bedRoom)
        formData.append('bath_room', bathRoom)
        formData.append('property_type', propertyFor)
        formData.append('cover_pic', coverPic)
        

        try {
            await dispatch(addProperty(formData))
            toast.success('New property added')
            setOpen(false)
        }catch(error) {
            console.log('error : ', error)
            toast.error("An error occured during form submission")
        }        
    }


    return (
        <div className="add">
            <div className='modal'>
                <span className='close' onClick={()=>setOpen(false)}>X</span>
                <h1>Add new Property</h1>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <label>Title</label>
                        <input 
                            type='text' 
                            placeholder='Enter the Title(min 8 characters)' 
                            required 
                            value={title} 
                            onChange={(e)=>setTitle(e.target.value)}
                            pattern="[A-Za-z0-9\s]{8,50}"
                            title="Title should be alphanumeric and minimun 8 up to 50 characters long"
                        />
                    </div>
                    <div className='item'>
                        <label>Address</label>
                        <input 
                            type='text' 
                            placeholder='Enter The Address' 
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            required
                            pattern="[A-Za-z0-9 ,.'-]{1,150}"
                            title='Address should be alphanumeric including spaces and common punctuation mark, up to 150 characters length'
                        />
                    </div>

                    <div className='item'>
                        <label>Description</label>
                        <textarea 
                            placeholder='Enter the Description' 
                            rows='4' 
                            required
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                    <div className='item-group'>
                        <div className='item'>
                            <label>Price</label>
                            <input 
                                type='number' 
                                placeholder='Enter The Price' 
                                required
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                                pattern="\d+(\.\d{1,2})?"
                                title="Price should be a number with up to 2 decimal places"
                                min="0"
                            />
                        </div>
                        <div className='item'>
                            <label>Square Feet</label>
                            <input 
                                type='number' 
                                placeholder='Enter The SQ.feet'
                                value={sqFeet}
                                onChange={(e)=>setSqFeet(e.target.value)}
                                required
                                pattern="\d+"
                                title="Square feet should be a positive number"
                                min="0"
                            />
                        </div>
                    </div>
                    
                    <div className='item-group'>
                        <div className='item'>
                            <label>Bed Room</label>
                            <input 
                                type='number' 
                                placeholder='No.of Bed Rooms'
                                value={bedRoom}
                                onChange={(e)=>setBedRoom(e.target.value)}
                                required
                                pattern="\d+"
                                title="Number of bedrooms should be a positive number"
                                min="0"
                            />
                        </div>
                        <div className='item'>
                            <label>Bath Room</label>
                            <input 
                                type='number' 
                                placeholder='No.of Bath Rooms' 
                                required
                                value={bathRoom}
                                onChange={(e)=>setBathRoom(e.target.value)}
                                pattern="\d+"
                                title="Number of bathrooms should be a positive number"
                                min="0"
                            />
                        </div>
                    </div>
                    
                    <div className='item'>
                        <label>Property For</label>
                        <select 
                            value={propertyFor}
                            onChange={(e)=>setPropertyFor(e.target.value)}
                            required
                        >
                            <option value='' disabled hidden className='select-holder'>---select property for---</option>
                            <option value='buy'>For Sale</option>
                            <option value='lease'>For Lease</option>
                            <option value='rent'>For Rent</option>
                        </select>
                    </div>
                    <div className='item'>
                        <label>Cover Pic</label>
                        <input 
                            type='file' 
                            accept='image/*' 
                            placeholder='Add the cover pic' 
                            onChange={(e)=>setCoverPic(e.target.files[0])}
                            required
                        />
                    </div>
                    <button>Add Property</button>
                </form>
            </div>
        </div>
    )
}

export default AddProperty








