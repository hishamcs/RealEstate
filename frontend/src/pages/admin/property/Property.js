import { Link, useParams } from 'react-router-dom'
import './property.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchProperties } from '../../../redux/actions/propertyActions'



const Property = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const property = useSelector(state=>state?.properties?.properties?.find(item=>item.id===parseInt(id)) || null)
    useEffect(()=> {
        dispatch(fetchProperties())
    }, [dispatch])
    return(
        <div className='property'>
            <div className='info'>
                <div className='topInfo'>
                    <h1>Property</h1>
                    {/* <button>Update</button>
                    <button className='addImg'>Add images</button> */}
                </div>
                <div className='contents'>
                    <div className='propImg'>
                        <div className='coverPic'>
        
                            <img src={"http://127.0.0.1:8000" + property?.cover_pic} alt='' />
                        </div>
                        <div className='otherImgs'>
                            {property?.images?.map((img)=> (
                                <img src={"http://127.0.0.1:8000"+img.image}  alt='' />
                            ))}
                            
                        </div>
                    </div>
                    <div className='details'>
                        <div className='item'>
                            <span className='title'>Title : </span>
                            <span>{property?.title}</span>
                        </div>
                        <div className='item'>
                            <span>Description : </span>
                            <span>{property?.description}</span>
                        </div>
                        <div className='item'>
                                <span className='title'>Address : </span>
                                <span>{property?.address}</span>
                        </div>
                        <div className='bottom'>
                            
                            <div className='item'>
                                <span className='title'>Price : </span>
                                <span>₹ {property?.price}</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Square Feet : </span>
                                <span>{property?.sq_feet} sqft</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Bed Room : </span>
                                <span>{property?.bed_room}</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Bath Room : </span>
                                <span>{property?.bath_room}</span>
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className='item'>
                                <span className='title'>Property For : </span>
                                <span>{property?.property_type}</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Status : </span>
                                <span>{property?.status}</span>
                            </div>
                            <div className='item'>
                                <span className='title'>Listed On : </span>
                                <span>{property?.listed_on}</span>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                {property?.held_user && <div className='heldUser'> 
                    Held By <Link to={`/ad-home/users/${property?.held_user.id}`}>{property?.held_user.username}</Link>
                </div>}
            </div>
            
        </div>
    )
}


export default Property