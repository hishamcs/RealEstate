


import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../../components/admin/dataTable/DataTable'
import './properties.scss'
import { useEffect, useState } from 'react'
import {fetchProperties, propertyBlock} from '../../../redux/actions/propertyActions'
import toast from 'react-hot-toast'

import Swal from 'sweetalert2'

import AddProperty from '../../../components/admin/addProperty/AddProperty'


const columns = [
    {field: "id", headerName: "PrimKey", width:50},
    {
        field: 'img',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params) => {
            const imageUrl = params.row.cover_pic.startsWith('http')
                ? params.row.cover_pic
                : 'http://127.0.0.1:8000'+params.row.cover_pic
            return <img src={imageUrl || '/noavatar.png'} alt='' />
        }
    },
    {
        field: 'title',
        type: 'string',
        headerName: 'Title',
        width:150,
    },
    {
        field: 'address',
        type: 'string',
        headerName: 'Address',
        width:200,
    },
    {
        field: 'description',
        type: 'string',
        headerName: 'Description',
        width:200,
    },
    {
        field: 'status',
        type: 'string',
        headerName: 'Status',
        width:100,
    },
    {
        field: 'property_type',
        type: 'string',
        headerName: 'Property For',
        width:100,
    },
    {
        field: 'price',
        type: 'string',
        headerName: 'Price(₹)',
        width:100,
    },
    {
        field: 'bed_room',
        type: 'string',
        headerName: 'Bed Room',
        width:70,
    },
    {
        field: 'bath_room',
        type: 'string',
        headerName: 'Bath Room',
        width:70,
    },

]

const Properties = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const {properties, error} = useSelector(state=>state.properties)
    useEffect(() => {
        dispatch(fetchProperties())
    }, [dispatch])
    
    useEffect(()=> {
        if(error) {
            toast.error(error)
        }
    },[error])
    
    const handleBlockProperty = (propertyId) => {
        Swal.fire({
            title: "Are you sure?",
            text:"Do you want to change the status of property",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText:"Yes"
        }).then((result)=> {
            if(result.isConfirmed) {
                dispatch(propertyBlock(propertyId)).then((data)=> {
                    toast.success('Property status updated...')
                }).catch(error=>{
                    toast.error(error.message || 'An error occured...')
                })
            }
        })
    }

    return(
        <div className='properties'>
            <div className='info'>
                <h1>Properties</h1>
                <button onClick={()=>setOpen(!open)}>AddNew Property</button>
            </div>
            <DataTable columns={columns} rows={properties || []} slug='properties' handleBlockFn={handleBlockProperty}/>
            {open && <AddProperty slug='property' setOpen={setOpen}  columns={columns}/>}
        </div>
    )
}

export default Properties