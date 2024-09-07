import { useEffect, useState } from 'react'
import RequestForm from '../../../components/user/requestForm/RequestForm'
import './myProperty.scss'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../axios'



const MyProperty = () => {
    const {id} = useParams()
    const [open, setOpen] = useState(false)
    const [property, setProperty] = useState({})
    const [maintenances, setMaintenances] = useState([])
    useEffect(()=> {
        axiosInstance.get('property/myproperty/', {params:{property_id:id}}).then((response)=> {
            setProperty(response.data.property)
            setMaintenances(response.data.maintenances)
        }).catch((error) => {
            console.log(error)
        })
    }, [id, open])
    return (
        <div className="myProperty">
            <div className="details">
                <div className="wrapper">
                <div className='propImg'>
                    <div className='coverPic'>
                        <img src={"http://127.0.0.1:8000" + property?.cover_pic} alt='' />
                    </div>
                    {/* <div className='otherImgs'>
                            {property?.images?.map((img)=> (
                                <img src={"http://127.0.0.1:8000"+img.image}  alt='' />
                            ))} 
                            <img src='https://clarity.pk/wp-content/uploads/2021/03/realestate-pakistan-850x491.jpg' alt='' />
                            <img src='https://clarity.pk/wp-content/uploads/2021/03/realestate-pakistan-850x491.jpg' alt='' />
                            <img src='https://clarity.pk/wp-content/uploads/2021/03/realestate-pakistan-850x491.jpg' alt='' />
                            
                    </div> */}
                    </div>
                    {/* table */}
                    {maintenances.length > 0 && (<div className='maintenanceTable'>
                        <h2>Maintenance</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Requested Date</th>
                                    <th>Maintenance Type</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Resolved date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {maintenances.map((item, index)=> (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.requested_date}</td>
                                    <td>{item.maintenance_type}</td>
                                    <td>{item.description}</td>
                                    <td>{item.status}</td>
                                    <td>{item.resolved_date}</td>
                                </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>)}

                </div>
            </div>

            <div className='features'>
                <div className='wrapper'>
                <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{property.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{property.address}</span>
                                </div>
                                {/* <div className='typeAndType'>
                                    <div className="price">₹ {property.price}</div>
                                    <span className='propertyType'>
                                        {property.status}
                                    </span>
                                </div> */}

                                <div className="sizes">
                                        <div className="size">
                                            <span>{property.sq_feet} sqft</span>
                                        </div>
                                        <div className="size">
                                            <img src="/bed.png" alt="" />
                                            <span>{property.bed_room} beds</span>
                                        </div>
                                        <div className="size">
                                            <img src="/bath.png" alt="" />
                                            <span>{property.bath_room} bathroom</span>
                                        </div>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className="bottom">
                        {property.description}
                        </div>
                        <div className='typeDetails'>
                            {property.status ==='sold'?<span>Congratzz You own the property...</span>:
                                property.status==='leased'?<span>You have leased this property</span>:<span>You are renting this property</span>}
                            {property.status !=='sold' && <span>Monthly Payment rent : ₹ {property.price}</span>}
                            {property.status !=='sold' && <span>Deposit Money : ₹ {property.status==='leased'? property.price*2 : "1000"} </span>}
                        </div>
                        {property.status !== 'sold' && <button onClick={()=>setOpen(true)}>Maintenance Request</button>}
                    </div>
                </div>
            </div>
            {open && <RequestForm setOpen={setOpen} property_id={property.id}/>}
        </div>
    )
}

export default MyProperty