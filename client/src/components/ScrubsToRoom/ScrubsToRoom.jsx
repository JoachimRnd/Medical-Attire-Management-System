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






const scrubRooms = [
    {
      value: 'Main Theatre',
      label: 'Main Theatre',
    },
    {
      value: 'Small Theatre',
      label: 'Small Theatre',
    }
  ];

  const number = [
    {
      value: '0.51',
      label: '0.51',
    },
    {
      value: '2.44',
      label: '2.44',
    }
  ];

  const scrubTypes = [
    {
      value: 'Labcoat',
      label: 'Labcoat',
    },
    {
      value: 'Scrub Top',
      label: 'Scrub Top',
    },
    {
        value: 'Scrub Bottom',
        label: 'Scrub Bottom',
    }
  ];

  const sizes = [
    {
      value: 'XS',
      label: 'XS',
    },
    {
      value: 'S',
      label: 'S',
    },
    {
        value: 'M',
        label: 'M',
    },
    {
        value: 'L',
        label: 'L',
    },
    {
        value: 'XL',
        label: 'XL',
    }
  ];

  const colors = [
    {
      value: 'white',
      label: 'white',
    },
    {
      value: 'lilac',
      label: 'lilac',
    },
    {
        value: 'blue',
        label: 'blue',
    },
    {
        value: 'green',
        label: 'green',
    },
    {
        value: 'grey',
        label: 'grey',
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

  

function ScrubsToRoom() {
    //Popover
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  


    return (
        <div>
                <button onClick={handleClickOpen} id="s-c-green" className="scrub-actions-box">Assign to Srub Room</button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Assign Scrubs to a Room</DialogTitle>
                    <DialogContent>
                            <Box
                                component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                                noValidate
                                autoComplete="off"
                                >
                                <div className="form-roomDetail">
                                    <TextField
                                        id="outlined-select-scrubRoom"
                                        select
                                        label="Select Scrub Room"
                                        style={{width: '35ch'}}
                                    >
                                    {scrubRooms.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField> 
                                    <TextField
                                        id="outlined-select-number"
                                        select
                                        label="Select Number"
                                        style={{width: '20ch'}}
                                    >
                                    {number.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField> 
                                </div>
                                <Divider style={{marginTop: 15, marginBottom: 15}}/>    
                                <div className="form-roomScrubDetail">
                                    <TextField
                                        id="outlined-select-type"
                                        select
                                        label="Select Type"
                                        style={{width: '13ch'}}
                                    >
                                    {scrubTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                                    <TextField
                                        id="outlined-select-size"
                                        select
                                        label="Select Size"
                                        style={{width: '13ch'}}

                                    >
                                    {sizes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                                    <TextField
                                        id="outlined-select-colors"
                                        select
                                        label="Select Color"
                                        style={{width: '13ch'}}
                                    >
                                    {colors.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                                    <TextField
                                        id="outlined-select-genders"
                                        select
                                        label="Select Gender"
                                        style={{width: '13ch'}}
                                    >
                                    {genders.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField>                        


                                </div>
                                <TextField id="outlined-basic" label="Amount" variant="outlined" style={{width: '14ch'}}/>

                            </Box>

                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button onClick={handleClose} variant="outlined">Submit</Button>
                </DialogActions>

                </Dialog>

      </div>
    )
}

export default ScrubsToRoom