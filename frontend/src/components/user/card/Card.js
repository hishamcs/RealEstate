import { Link } from 'react-router-dom'
import './card.scss'



const Card = ({item}) => {
    return (
        <div className='card'>
            <Link to={`${item.id}`} className='imgContainer'>
                <img src={"http://127.0.0.1:8000"+item.cover_pic} alt='' className='coverPic' />
            </Link>
            
            <div className='textContainer'>
                <h2 className='title'>
                    {item.title}
                </h2>
                <p className='address'>
                    <img src='/pin.png' alt='' />
                    <span>{item.address}</span>
                </p>
                <div className='typeAndPrce'>
                    <p className='price'>
                        ₹ {item.price}     
                    </p>
                    <span>
                    {
                        item?.property_type 
                                ? item.property_type==='buy'
                                        ? "For Sale"
                                        : item.property_type === 'rent'
                                            ? "For Rent"
                                            : "For Lease"
                                : ""
                    }
                    </span>
                </div>
                

                <div className='bottom'>
                    <div className='features'>
                        <div className='feature'>
                            <img src='/bed.png' alt='' />
                            <span>{item.bed_room} bedroom</span>
                        </div>
                        <div className='feature'>
                            <img src='/bath.png' alt='' />
                            <span>{item.bath_room} bathroom</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card