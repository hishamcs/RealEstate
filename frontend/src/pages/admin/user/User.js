import { useDispatch, useSelector } from 'react-redux'
import './user.scss'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userListFetch } from '../../../redux/actions/userActions'
import axiosInstance from '../../../axios'




const User = () => {
    const dispatch = useDispatch()
    
    const {id} = useParams()
    const user = useSelector(state=>state?.userList?.userList?.find(item=>item.id===parseInt(id)) || null)
    const [items, setItems] = useState([])
    useEffect(()=> {
        dispatch(userListFetch())
        axiosInstance.get('property/property-holdings/', {params:{user_id:id}}).then((response)=> {
            setItems(response.data)
        })
        

    }, [dispatch, id])

    return(
        <div className='user'>
            <div className='info'>
                <div className='topInfo'>
                    <img src='/noavatar.png' alt='' />
                    <h1>{user?.username}</h1>
                </div>

                <div className='details'>
                    <div className='item'>
                        <span>User Name : </span>
                        <span>{user?.username}</span>
                    </div>
                    <div className='item'>
                        <span>Email : </span>
                        <span>{user?.email}</span>
                    </div>
                    <div className='item'>
                        <span>Phone : </span>
                        <span>{user?.phone_number}</span>
                    </div>
                    <div className='item'>
                        <span>Status : </span>
                        <span>{user?.is_active ? "Active": "Deactive"}</span>
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
                                    <Link to={`/ad-home/properties/${item.id}`}><button>View</button></Link>
                                </td>
                            </tr>
                            ))}
                            
                            
                        </tbody>
                    </table>
                </div>)}
        </div>
    )
}

export default User