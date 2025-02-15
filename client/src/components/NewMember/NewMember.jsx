import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import '../DashboardComponents/ScrubActions.scss';
import { CustomButton } from '..';
import { useState, useCallback } from 'react';
import { registerMember } from '../../redux/features/employeeSlice/employeeSlice';
import { useSelector, useDispatch } from 'react-redux';


const professions = [
  {
    value: 'MSM',
    label: 'Medical Staff Member',
  },
  {
    value: 'HSM',
    label: 'Housekeeping Staff Member',
  }
];

const genders = [
  {
    value: 'female',
    label: 'female',
  },
  {
    value: 'male',
    label: 'male',
  }
];



const NewMember = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setgender] = useState("");
  const dispatch = useDispatch();

  //Popover
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = useCallback(() => {

    if (email == '' || name == '' || profession == '' || gender == '') {
      console.log("you must fill all the fields");
      //TODO Do we have a component to display that?
    } else {
      setOpen(false);

      /*console.log(email);
      console.log(name);
      console.log(profession);
      console.log(gender);*/

      // CALL API 
      dispatch(registerMember({ email: email, name: name, profession: profession, gender: gender }));

      // RESET VALUE
      setEmail('');
      setName('');
      setProfession('');
      setgender('');
    }
  }, [email, name, profession, gender]);

  return (
    <div>
      <CustomButton
        text="REGISTER NEW MEMBER"
        type="primary"
        fontSize="16px"
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register new staff member</DialogTitle>
        <DialogContent>
          <Box
            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Enter their email" variant="outlined" style={{ width: '97%' }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
            <TextField id="outlined-basic" label="Enter their name" variant="outlined" style={{ width: '40%' }} value={name} onChange={(e) => { setName(e.target.value) }} />

            <TextField
              id="outlined-select-type"
              select
              label="Select Profession"
              style={{ width: '13ch' }} value={profession} onChange={(e) => { setProfession(e.target.value) }}
            >
              {professions.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-genders"
              select
              label="Select Gender"
              style={{ width: '13ch' }} value={gender} onChange={(e) => { setgender(e.target.value) }}
            >
              {genders.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleRegister} variant="outlined">REGISTER</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewMember;
