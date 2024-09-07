import { useEffect, useState } from 'react'
import './addInventory.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProperties } from '../../../redux/actions/propertyActions'
import axiosInstance from '../../../axios'




const AddInventory = ({setOpen}) => {
    const dispatch = useDispatch()
    const [number, setNumber] = useState('')
    const [inventoryName, setInventoryName] = useState('')
    const [property, setProperty] = useState('')
    
    const {properties} = useSelector(state=>state?.properties)
    useEffect(()=>{
        dispatch(fetchProperties())
    }, [dispatch])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const {data} = await axiosInstance.post('property/inventory/', {property_id:property, item_name:inventoryName, number}) 
            console.log('data : ',data)
            setOpen(false)
        }catch(error){
            console.log(error)
        }
        
    }

    return (
        <div className="addInventory">
            <div className='modal'>
                {console.log(properties)}
                <h1>Add new Inventory</h1>
                <span className='close'onClick={()=>setOpen(false)}>X</span>
                <form onSubmit={handleSubmit}>
                    <div className='item'>
                        <label>Property</label>
                        <select
                            required
                            value={property}
                            onChange={(e)=>setProperty(e.target.value)}
                        >
                            <option value=''>Select a property</option>
                            {properties?.map((property)=> (
                                <option key={property.id} value={property.id}>
                                    {property.title}
                                </option>
                            ))}
                            
                        </select>
                    </div>
                    <div className='item'>
                        <label>Inventory Name</label>
                        <input 
                            type='text' 
                            placeholder='Enter inventory name'
                            required
                            value={inventoryName}
                            onChange={(e)=>setInventoryName(e.target.value)}
                        />
                    </div>
                    <div className='item'>
                        <label>Number</label>
                        <input 
                            type='number' 
                            placeholder='Enter number of inventories'
                            required
                            value={number}
                            onChange={(e)=>setNumber(e.target.value)}
                            pattern="\d+"
                            title="count should be a positive number"
                            min="0"
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddInventory