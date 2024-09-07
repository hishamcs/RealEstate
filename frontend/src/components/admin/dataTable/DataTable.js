
import { Link } from 'react-router-dom'
import './dataTable.scss'
import { DataGrid, GridToolbar} from '@mui/x-data-grid'





const DataTable = ({columns, rows, slug, handleBlockFn}) => {
    
    const handleBlock = (id) => {
        handleBlockFn(id)
    }

    const actionColumn = {
        field: 'action',
        headerName: 'Action',
        width:200,
        renderCell: (params) => {
            
            return (
                <div className="action">

                    <Link to={`/ad-home/${slug}/${params.row.id}`}>
                        View
                    </Link>
                    <button 
                        onClick={()=>handleBlock(params.row.id)}
                       
                    >Block
                    </button>
                </div>
            )
        }
    } 


    

    return(
        <div className='dataTable'>
            <DataGrid
                className='dataGrid'
                rows={rows}
                columns={[...columns, actionColumn]}
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
    )
}

export default DataTable
