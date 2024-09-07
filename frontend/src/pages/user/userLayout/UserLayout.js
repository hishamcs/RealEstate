import { Outlet } from 'react-router-dom'
import NavbarUser from '../../../components/user/navbarUser/NavbarUser'
import './userLayout.scss'



const UserLayout = () => {
    return(
        <div className="layout">
            <div className="userNavbar">
                <NavbarUser />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout