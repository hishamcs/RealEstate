
import {logout} from '../../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import './navbar.scss'


const Navbar = () => {
    const dispatch = useDispatch()
    
    const handleLogout = () => {
        dispatch(logout())
    }
    return(
        <div className='navbar'>
            <div className='logo'>
                
            </div>

            <div className='icons'>
                <div className='user'>
                    <img src='/noavatar.png' alt=''  />
                    <span>Admin</span>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar