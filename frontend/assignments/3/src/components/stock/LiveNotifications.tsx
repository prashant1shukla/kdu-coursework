import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Transaction } from '../../types/Transaction';
import { Box, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  history: {
    paddingLeft: "20px",
    paddingRight:"20px",
    border: "1px solid #000",
    marginLeft: "20px",
    marginTop: "10px",
    minWidth: "350px",
    minHeight:"280px"
  },
  historyMessage: {
    border: "1px solid #000",
    borderRadius: "5px",
    padding: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  stock: {
    paddingLeft: '15px',
    marginTop:'15px'
  },
  time:{
    fontSize:'10px'
  }
});

const LiveNotifications: React.FC = () => {
  const classes = useStyles();

  

  return (
    <div className={classes.history}>
      <Box sx={{ width: '100%', maxHeight: 200, overflowY: 'auto', marginTop: 2 }}>
          <Box sx={{ marginTop: 1 }}>
              <div className={classes.stock}>
                <Typography>Sagun bought 500 Miller Whitney</Typography>
                <Typography className={classes.time}>10:00 AM</Typography>
              </div>
              <div className={classes.stock}>
                <Typography>Aakash bought 500 Miller Whitney</Typography>
                <Typography className={classes.time}>10:00 AM</Typography>
              </div>
              <div className={classes.stock}>
                <Typography>Amey bought 500 Miller Whitney</Typography>
                <Typography className={classes.time}>10:00 AM</Typography>
              </div>
          </Box>
      </Box>
    </div>
  );
}

export default LiveNotifications;
