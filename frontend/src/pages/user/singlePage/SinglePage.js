import { useNavigate, useParams } from 'react-router-dom'
import './singlePage.scss'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../axios'
import toast from 'react-hot-toast'




const SinglePage = () => {
    const navigate = useNavigate()
    const [property, setProperty] = useState(null)
    const [items, setItems] = useState([])
    const {id} = useParams()
    useEffect(()=> {
        axiosInstance.get('property/', {params:{property_id:id}}).then((response)=> {
            setProperty(response.data.property)
            setItems(response.data.inventories)
        }).catch((error)=> {
            console.log('errro : ', error)
            navigate('*')
        })
    }, [id, navigate])

    const handlePurchase = async() => {

        try {
            const transactionData = {
                propty:parseInt(property?.id),
                transaction_type:property.property_type,
                amount:paymentDetails.total
            }
            await axiosInstance.post('property/transaction/', transactionData)
            toast.success('Transaction is successful...')
            navigate('/home/profile')
        } catch(error) {
            console.log('error  :', error)
        }
    }

    const calculatePaymentDetails = () => {
        let total = 0
        let deposit = 0
        let rent = 0
        
        if (property?.property_type==='buy') {
            total = property?.price
        } else if (property?.property_type==='lease') {
            deposit = 2 * property?.price
            rent = parseFloat(property?.price)
            total = deposit + rent
        } else if (property?.property_type==='rent') {
            deposit = 1000
            rent = parseFloat(property?.price)
            total = deposit + rent
        }

        return {total, deposit, rent}
    }

    const paymentDetails = calculatePaymentDetails()

    return (
        <div className='singlePage'>
            <div className="details">
                <div className="wrapper">
                <div className='propImg'>
                    <div className='coverPic'>
        
                        <img src={"http://127.0.0.1:8000" + property?.cover_pic} alt='' />
                    </div>
                    </div>
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{property?.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{property?.address}</span>
                                </div>
                                <div className='typeAndType'>
                                    <div className="price">₹ {property?.price}</div>
                                    <span className='propertyType'>
                                        {
                                            property?.property_type 
                                                        ? property.property_type==='buy'
                                                            ? "For Sale"
                                                            : property.property_type === 'rent'
                                                                ? "For Rent"
                                                                : "For Lease"
                                                        : ""
                                        }
                                    </span>
                                </div>
                                <div className='cont'>
                                    <div className="sizes">
                                            <div className="size">
                                                <span>{property?.sq_feet} sqft</span>
                                            </div>
                                            <div className="size">
                                                <img src="/bed.png" alt="" />
                                                <span>{property?.bed_room} beds</span>
                                            </div>
                                            <div className="size">
                                                <img src="/bath.png" alt="" />
                                                <span>{property?.bath_room} bathroom</span>
                                            </div>
                                    </div>

                                    <div className='inveries'>
                                        {items.map((item)=> (
                                            <div className='inventry'>
                                            
                                            <span>{item.qty}</span>
                                            <span>{item.item_name}r</span>
                                        </div> 
                                        ))}
                                                                           
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="bottom">
                        {property?.description}
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="features">
                <div className="wrapper">

                <table>
                    <thead>
                        <tr>
                            <th>Details</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {property?.property_type === 'lease' && (
                        <tr>
                            <td>Deposit</td>
                            <td>₹ {paymentDetails.deposit}</td>
                        </tr>
                        )}
                        
                        {(property?.property_type==='lease' || property?.property_type==='rent') && (

                        <tr>
                            <td>
                                {property?.property_type==='lease' ? "First Month's Rent":"Rent"}
                            </td>
                            <td>₹ {paymentDetails.rent}</td>
                        </tr>
                        )}
                        {property?.property_type === 'rent' && (
                        <tr>
                            <td>Deposit</td>
                            <td>₹ {paymentDetails.deposit}</td>
                        </tr>
                        )}
                        
                        <tr>
                            <td><b>Total Payment</b></td>
                            <td><b>₹ {paymentDetails.total}</b></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handlePurchase}>
                    {
                      property?.property_type
                                ? property.property_type === 'buy'
                                    ? "Purchase"
                                    : property.property_type === 'rent'
                                        ? "Rent Now"
                                        : "Lease Now"
                                : ""
                    }
                </button>
                </div>
                <div className='termsAndConditions'>
                    {(property?.property_type === 'rent' || property?.property_type === 'lease') && (<ul>
                        <li><strong>Deposit Payment:</strong>
                            <ul>
                                {property?.property_type === 'rent' && <li>A deposit of ₹1000 is required to be paid upfront as security for renting the property.</li>}
                                {property?.property_type === 'lease' && <li>For leasing the property, a deposit equal to two times the monthly rent is required to be paid upfront as a security deposit.</li>}
                                <li>This deposit is refundable upon termination of the rental agreement, subject to any deductions for damages or unpaid dues.</li>
                            </ul>
                        </li>
                        <li><strong>Maintenance Management:</strong>
                            <ul>
                                <li>All property maintenance, including repairs, plumbing, electrical work, and general upkeep, will be managed by the admin or property owner.</li>
                                <li>Tenants should report any maintenance issues promptly to the admin, and repairs will be addressed in a timely manner.</li>
                            </ul>
                        </li>
                    </ul>)}


                </div>
            </div>
        </div>
    )
}

export default SinglePage

