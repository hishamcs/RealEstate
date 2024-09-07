

import './users.scss'
import DataTable from '../../../components/admin/dataTable/DataTable'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userBlock, userListFetch } from '../../../redux/actions/userActions'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'





const columns = [
    {field: "id", headerName: "ID", width:90},
    {
        field: 'img',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || '/noavatar.png'} alt='' />
        }
    },
    {
        field: 'username',
        type: 'string',
        headerName: 'User Name',
        width:150,
    },
    {
        field: 'email',
        type: 'string',
        headerName: 'Email',
        width:150,
    },
    {
        field: 'phone_number',
        type: 'string',
        headerName: 'Phone',
        width:150,
    },
    {
        field: 'is_active',
        type: 'string',
        headerName: 'Status',
        width:150,
        renderCell: (params)=> {
            return<span>{params.row.is_active?'Active':'Deactive'}</span>
        }
    },

]

 

const Users = () => {
    const dispatch = useDispatch()
    const {userList, error} = useSelector(state=>state.userList)

    useEffect(()=> {
        dispatch(userListFetch())
    }, [dispatch])

    useEffect(()=> {
        if (error){
            toast.error(error)
        }
    }, [error])


    const handleBlockUser = (userId) => {
        Swal.fire({
            title:"Are you sure?",
            text:"Do you want to block this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"

        }).then((result)=> {
            if(result.isConfirmed) {
                dispatch(userBlock(userId)).then((data)=> {
                    toast.success('User status is changed...')
                }).catch((error)=> {
                    toast.error(error.message || 'An error occured')
                })
                
            }
        })
        
    }
    
    return(
        <div className='users'>
            <div className='info'>
                <h1>Users</h1>
            </div>
            <DataTable columns={columns} rows={userList} slug='users' handleBlockFn={handleBlockUser}/>
        </div>
    )
}

export default Users

