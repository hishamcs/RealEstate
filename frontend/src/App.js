import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';


import LoginPage from '../src/pages/loginPage/LoginPage'
import RegisterPage from '../src/pages/registerPage/RegisterPage'
import HomePage from '../src/pages/user/homePage/HomePage'
import AdminHome from '../src/pages/admin/adminHome/AdminHome'
import AdminLayout from './pages/admin/adLayout/AdminLayout';
import Properties from './pages/admin/properties/Properties';
import Property from './pages/admin/property/Property';
import User from './pages/admin/user/User';
import Users from './pages/admin/users/Users'
import UserLayout from './pages/user/userLayout/UserLayout';
import SinglePage from './pages/user/singlePage/SinglePage';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Profile from './pages/user/profile/Profile';
import MyProperty from './pages/user/myProperty/MyProperty';
import Maintenances from './pages/admin/maintenances/Maintenance';
import Inventory from './pages/admin/inventory/Inventory';


function App() {

  const {userInfo} = useSelector(state=>state?.userLogin)
  
  const ProtectedRoute = ({children}) => {
    if(!userInfo) {
      return <Navigate to='/' />
    } else if(userInfo.is_superuser) {
      return <Navigate to='/ad-home' />
    }
    return children
  }

  const LogoutRoute = ({children}) => {
    if(userInfo) {
      return <Navigate to='/home' />
    }
    return children
  }

  const AdminProtectedRoute = ({children}) => {
    if(!userInfo) {
      return <Navigate to='/' />
    } else if(!userInfo.is_superuser) {
      return <Navigate to='/home' />
    }
    return children
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LogoutRoute><LoginPage /></LogoutRoute>}/>
        <Route path='/register' element={<LogoutRoute><RegisterPage /></LogoutRoute>} />
        <Route path='/home' element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
          <Route index element={<HomePage />} />
          <Route path=':id' element={<SinglePage />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:id' element={<MyProperty />} />
        </Route>
        <Route path='/ad-home' element={<AdminProtectedRoute><AdminLayout/></AdminProtectedRoute>} >
          <Route index element={<AdminHome />} />
          <Route path='properties' element={<Properties />} />
          <Route path='properties/:id' element={<Property />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<User />} />
          <Route path='maintenances' element={<Maintenances />} />
          <Route path='inventories' element={<Inventory />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
    <Toaster position='top-center' reverseOrder={false} />
    </>
  );
} 

export default App;
