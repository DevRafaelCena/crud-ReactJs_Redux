import {  useSelector, useDispatch } from "react-redux";
import { fetchUsers, postUsers} from "../reducers/users";
import { useEffect, useState } from 'react';
import { UsersState } from '../reducers/users';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


import CreateUserModal from "./CreateUserModal";

const UserList = ()=>{

  const users = useSelector((state: { users: UsersState }) => state.users.data);
  const status = useSelector((state: { users: UsersState }) => state.users.fetchUsersStatus);
  const dispatch = useDispatch();


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
     setOpen(true);
    };

    const handleClose = () => {
     setOpen(false);
    };

    const handleSubmit = async (user: any) => {

        await dispatch(postUsers(user)) 
        
        setOpen(false);

    };


  useEffect(() => {
    const fetchData = async () => {
      
      try {        
        await  dispatch(fetchUsers());
       
      } catch (err) {
        console.log(err);       
      }
     
    };
    fetchData();
  }, [dispatch]);

  if (status == 'loading') {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
       </Box>
    )
  }


    return (
            <TableContainer component={Paper}>
                <Button variant="contained" color="primary" onClick={handleOpen} style={{marginBottom: '10px'}}>
                    Criar Novo Usuário
                </Button>
            <CreateUserModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Email</TableCell>   
                    <TableCell align="right">...</TableCell>            
                </TableRow>
                </TableHead>
                    <TableBody>                       
                        {users.map((user) => (                   

                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {(user.name.firstname + ' ' + user.name.lastname).toUpperCase()}
                            </TableCell>
                            <TableCell align="right">{user.email}</TableCell>   
                            <TableCell align="right">
                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                              Apagar
                            </Button>  
                            </TableCell>                      
                            </TableRow>
                            
                        ))}                  
                    </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserList;