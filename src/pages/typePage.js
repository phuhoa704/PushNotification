import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../components/Sidebar/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, getTypesFetch } from './../redux/reducers/notificationState';
import ModalDelete from '../components/modals/modalDelete';
import ModalUpdate from '../components/modals/modalUpdate';
import ModalAdd from '../components/modals/modalAdd';
import Timeline from '../components/timeline/timeline';
import { addDays } from 'date-fns';
import moment from 'moment';

const TypePage = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        add: false,
        upd: false,
        del: false,
        time: false
    });
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
    })
    const onChange = (item) => {
        setRange([item.selection])
        setDate({
            startDate: item.selection.startDate,
            endDate: item.selection.endDate
        })
    }
    const [selectedRow, setSelectedRow] = useState();
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'createdAt', headerName: 'Created At', width: 200
        },
        {
            field: 'action', headerName: 'Action', width: 250, renderCell: (params) => {
                return <div>
                    <Button onClick={() => {
                        setState({
                            upd: true
                        });
                        setSelectedRow(params.row);
                    }}
                        variant='contained'
                        color='success'
                        sx={{ width: '80px' }}
                    >Update</Button>
                    <Button onClick={() => {
                        setState({
                            del: true
                        });
                        setSelectedRow(params.row);
                    }}
                        sx={{ width: '80px', marginLeft: '20px' }}
                        variant='contained'
                        color='error'
                    >Delete</Button>
                </div>
            }
        }
    ]

    const rows = useSelector(getTypes);

    const handleCloseDel = () => {
        setState({
            del: false
        })
    }
    const handleCloseUpd = () => {
        setState({
            upd: false
        })
    }
    const handleCloseAdd = () => {
        setState({
            add: false
        })
    }
    const handleCloseTime = () => {
        setState({
            time: false
        })
    }
    useEffect(() => {
        dispatch(getTypesFetch())
        //call APIs
        //console.log(moment(date.startDate).format('MM/DD/YYYY')+' - '+moment(date.endDate).format('MM/DD/YYYY')); 
    }, [dispatch,range]);
    return (
        <Grid container >
            <Grid item xs={3}>
                <Sidebar />
            </Grid>
            <Grid item xs={9}>
                <div className='actions' style={{ height: '50px' }}>
                    <Typography variant="h6" component="h2" sx={{ marginBottom: 1, float: 'left', marginTop: '10px' }}>
                        All Types
                    </Typography>
                    <Button onClick={() => {
                        setState({
                            add: true
                        });
                    }}
                        sx={{ float: 'right', marginRight: '50px', marginTop: '10px', width: '80px' }}
                        variant='contained'
                    >Add</Button>
                </div>
                <div className='data' style={{ height: 400, width: '95%' }}>
                    <DataGrid columns={columns} rows={rows} pageSize={5} rowsPerPageOptions={[5]} />
                </div>
                <div className='datepicker'>
                    <TextField value={moment(date.startDate).format('MM/DD/YYYY')+' - '+moment(date.endDate).format('MM/DD/YYYY')} onClick={() => setState({ time: true })}/>
                </div>
            </Grid>
            <ModalDelete open={state.del} handleClose={handleCloseDel} onCancel={handleCloseDel} selectedRow={selectedRow} />
            <ModalUpdate open={state.upd} handleClose={handleCloseUpd} onCancel={handleCloseUpd} selectedRow={selectedRow} />
            <ModalAdd open={state.add} handleCloseAdd={handleCloseAdd} onCancel={handleCloseAdd} selectedRow={selectedRow} />
            <Timeline open={state.time} handleClose={handleCloseTime} onCancel={handleCloseTime} state={range} onChange={onChange}/>
        </Grid>
    );
}

export default TypePage;
