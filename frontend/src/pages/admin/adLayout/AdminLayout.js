import { Outlet } from 'react-router-dom'


import './adminLayout.scss'
import Navbar from '../../../components/admin/navbar/Navbar'
import Menu from '../../../components/admin/menu/Menu'
import Footer from '../../../components/admin/footer/Footer'




const AdminLayout = () => {
    return(
        <div className="main">
            <Navbar />
            <div className='container'>
                <div className='menuContainer'>
                    <Menu />
                </div>
                <div className='contentContainer'>
                    <Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default AdminLayout