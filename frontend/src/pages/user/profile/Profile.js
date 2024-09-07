import { useSelector } from 'react-redux'
import './profile.scss'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../axios'
import { useNavigate } from 'react-router-dom'




const Profile = () => {
    const navigate = useNavigate()
    const {username, email, phone_number, count_of_property_held} = useSelector(state=>state.userLogin.userInfo)
    const [items, setItems] = useState([])
    useEffect(()=> {
        axiosInstance.get('property/property-holdings/').then((response)=> {
            console.log(response.data)
            setItems(response.data)
        })
    }, [])

    const handleRedirect = (id) => {
        navigate(`${id}`)
        
    }
    return (
        <div className="profile">
            <div className='container'>
                <div className='details'>
                    <div className='proPic'>
                        <img src='/noavatar.png' alt='proPic' />    
                    </div>
                    <div className='info'>
                        <div className='infoItem'>
                            <span>User Name : </span>
                            <span className='infoDetail'>{username}</span>
                        </div>
                        <div className='infoItem'>
                            <span>Email : </span>
                            <span className='infoDetail'>{email}</span>
                        </div>
                        <div className='infoItem'>
                            <span>Phone : </span>
                            <span className='infoDetail'>{phone_number}</span>
                        </div>
                        <div className='infoItem'>
                            <span>Properties Holding: </span>
                            <span className='infoDetail'>{items.length}</span>
                        </div>
                    </div>
                </div>

                {items.length > 0 && (<div className='propertiesTable'>
                    <h2>Properties Held</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Deposit</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items?.map((item)=> (
                            <tr key={item.id}>
                                <td>
                                    <img src={`http://127.0.0.1:8000`+item.cover_pic} alt='' />
                                </td>
                                <td>{item.title}</td>
                                <td>₹ {item.price}</td>
                                <td>
                                    {
                                        item.property_type==='buy'
                                            ?"---":item.property_type==='rent'
                                                    ? `₹ 1000`
                                                    : `₹ ${item.price*2}`
                                    }
                                </td>
                                <td>{item.status}</td>
                                <td>
                                    <button onClick={()=>handleRedirect(item.id)}>View</button>
                                </td>
                            </tr>
                            ))}
                            
                            
                        </tbody>
                    </table>
                </div>)}
                
            </div>
        </div>
    )
}

export default Profile