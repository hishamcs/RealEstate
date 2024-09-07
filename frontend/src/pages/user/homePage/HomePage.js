import { useEffect, useState } from 'react'
import Card from '../../../components/user/card/Card'
import './homePage.scss'
import axiosInstance from '../../../axios'



const HomePage = () => {
    const [properties, setProperties] = useState(null)
    useEffect(()=> {
        axiosInstance.get('property/').then((response)=> {
            setProperties(response.data)
        })
    }, [])

    return(
        <div className='homepage'>
            <div className='listContainer'>
                <div className='wrapper'>
                    {properties?.map((property)=> (
                        <Card key={property.id} item={property}/>
                    ))}
                    
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage