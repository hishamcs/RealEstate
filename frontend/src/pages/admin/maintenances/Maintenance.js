import { useEffect, useState } from 'react'
import DataTable from '../../../components/admin/dataTable/DataTable'
import './maintenances.scss'
import axiosInstance from '../../../axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import toast from 'react-hot-toast'






const Maintenances = () => {
    const [items, setItems] = useState([])


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'propty_title', headerName: 'Property Title', width: 150 },
        { field: 'requested_date', headerName: 'Requested Date', width: 150 },
        { field: 'maintenance_type', headerName: 'Type', width: 130 },
        { field: 'resolved_date', headerName: 'Resolved Date', width: 150 },
        {
            field:'status',
            headerName:'Status',
            width:130,
            renderCell:(params)=> {
                const {id, status} = params.row
                return(
                    <select
                        value={status}
                        onChange={(e)=>handleStatusChange(id, e.target.value)}
                        disabled={status === 'completed'}
                    >
                        {status !== 'completed' && <option value='pending'>Pending</option>}
                        {status !== 'completed' &&<option value='in_progress'>In Progress</option>}
                        {status !== 'completed' && status !== 'pending' && status === 'in_progress' && <option value='completed'>Completed</option>}
                        {status==='completed'&& <option value=''>Completed</option>}
                    </select>
                )
            }
        }
    ]

    const handleStatusChange = async(id, newStatus) => {

        const resolvedDate = newStatus === 'completed' ? new Date().toISOString() : null

        try {
            await axiosInstance.patch('property/maintenance/',{id,status:newStatus, resolved_date:resolvedDate})
            setItems(items.map(item=>
                item.id===id ? {...item, status:newStatus,resolved_date: resolvedDate}:item
            ))
            toast.success('Status updated successfully')    
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        axiosInstance.get('property/maintenance/').then((response)=> {
            const updatedRows = response.data.map(row=>({
                ...row,
                propty_title:row.propty ? row.propty.title:'N/A'
            }))
            setItems(updatedRows)
        }).catch((error)=> {
            console.log(error)
        })
    }, [])
    return(
        <div className="maintenances">
            <div className='info'>
                <h1>Maintenances</h1>
            </div>
            <div className='datatable'>
                <DataGrid
                    className='dataGrid'
                    rows={items}
                    columns={[...columns]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                    slots={{toolbar:GridToolbar}}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs:500 }
                        }
                    }}

                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                    
                    
                />
            </div>
        </div>
    )
}

export default Maintenances