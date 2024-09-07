import {logout} from '../../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './navbarUser.scss'



const NavbarUser = () => {
    const dispatch = useDispatch()
    const {username} = useSelector(state=>state?.userLogin?.userInfo)
    const handleLogout = () => {
        dispatch(logout())
    }
    return(
        <nav>
            <div className='left'>
                <Link to={'/'}>
                    <span>REALESTATE</span>
                </Link>
                
            </div>
            <div className='right'>
                <Link to={'profile'}>
                <span>Hi, {username}</span>
                </Link>
                
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default NavbarUser