import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api'; // ADD THIS
import { useGetData } from '../../custom-hooks'; // ADD THIS
import { Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, 
    DialogTitle } from '@mui/material'; // ADD THESE
import { AlbumForm } from '../../components/AlbumForm'; // ADD THIS

const columns: GridColDef[] = [

    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 110,
        editable: true,
        type: 'number'
    },
    {
        field: 'camera_quality',
        headerName: 'Camera Quality',
        width: 160
    },

    {
        field: 'flight_time',
        headerName: 'Flight Time',
        width: 110,
        editable: true
    },

    {
        field: 'max_speed',
        headerName: 'Max Speed',
        width: 110,
        editable: true,
    },

    {
        field: 'dimensions',
        headerName: 'Dimensions',
        width: 110,
        editable: true,
    },

    {
        field: 'weight',
        headerName: 'Weight',
        width: 110,
        editable: true,
    },

    {
        field: 'cost_of_production',
        headerName: 'Cost of Production',
        width: 110,
        editable: true,
        type: 'number'
    },

    {
        field: 'series',
        headerName: 'series',
        width: 110,
        editable: true,

    },
    
];

interface gridData{
    data:{
      id?:string;
    }
  }


export const DataTable = () =>{
    let { albumData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridRowSelectionModel>([])

    let handleOpen = () => {
    setOpen(true)
    }

    let handleClose = () => {
    setOpen(false)
    }

    let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
    }

    console.log(gridData) // a list of id's from checked rows
    const MyAuth = localStorage.getItem('myAuth')
    console.log(MyAuth)
    if (MyAuth == 'true'){
        return ( //conditionally render datatable
        <div style={{ height: 600, width: '100%' }}>
            <h2>Album In Our Collection</h2>
            <DataGrid
            rows={albumData}
            columns={columns}
            initialState={{
            pagination: {
            paginationModel: {
            pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        onSelectionModelChange = {(newSelectionModel: React.SetStateAction<GridRowSelectionModel>) => {setData(newSelectionModel)}}
                {...albumData}
      />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update ALbum</DialogTitle>
                <DialogContent>
                    <DialogContentText>Album id: {gridData[0]}</DialogContentText>
                    <AlbumForm id={`${gridData[0]}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="secondary">Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
        } else { 
            return( // **new** does not render datatable if user is not authenticated
                <div>
                    <h3>Please Sign In to View Your Album Collection</h3>
                </div>
        )};

}