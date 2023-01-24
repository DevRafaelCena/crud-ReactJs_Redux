import React, { useEffect, useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import {  useSelector } from "react-redux";
import { UsersState } from '../reducers/users';
import { handleAction } from 'redux-actions';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  interface CreateUserModalProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: ({firstname ,lastName, email }) => void;
  }


const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, handleClose, handleSubmit }) => {
  const status = useSelector((state: { users: UsersState }) => state.users.postUsersStatus);
  const [firstname, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [statusBtn, setStatusBtn] = useState(true);

  useEffect(()=>{
    if(!firstname || !email || !lastName){
      setStatusBtn(true)
    }else{
      setStatusBtn(false)
    }
  },[email,firstname,lastName])

    
  return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
            <form >
                <TextField name='nome' variant="standard" required fullWidth label="Nome" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                <TextField name='sobrenome' variant="standard" required fullWidth label="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <TextField name="email" variant="standard" required fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                {status !='loading'? (
                  <Button disabled={statusBtn} type="button" onClick={()=>{ handleSubmit({firstname ,lastName, email}) }} variant="contained" style={{marginTop:10}} color="primary">
                    Criar
                  </Button>
                ): (
                   <CircularProgress />
                 
                )}
               
            </form>
        </Box>   
    </Modal>
    );
};

export default CreateUserModal;