import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import './inventory.scss'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../axios'
import AddInventory from '../../../components/admin/addInventory/AddInventory'



const Inventory = () => {
    const [items, setItems] = useState([])
    const [open, setOpen] = useState(false)
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'propty_title', headerName: 'Property Title', width: 150 },
        { field: 'item_name', headerName: 'Name', width: 150 },
        { field: 'qty', headerName: 'Quantity', width: 150 },
    ]

    useEffect(()=> {
        axiosInstance.get('property/inventory/').then((response)=> {
            const updatedRows = response.data.map(row=>({
                ...row,
                propty_title:row.propty ? row.propty.title:'N/A'
            }))
            setItems(updatedRows)
        }).catch(error=> {
            console.log(error)
        })
    }, [open])

    return(
        <div className="inventory">
            <div className='info'>
                <h1>Inventory</h1>
                <button onClick={()=>setOpen(true)}>Add Inventory</button>
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
            {open && <AddInventory setOpen={setOpen} />}
        </div>
    )
}

export default Inventory