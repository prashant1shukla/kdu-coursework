import React from 'react';
import StockDropdown from '../stock/StockDropdown';
import TransactionHistory from '../stock/TransactionHistory';
import {createUseStyles} from 'react-jss'
import LiveNotifications from '../stock/LiveNotifications';

const useStyles = createUseStyles(({
  stock:{
    display:"flex",
    flexDirection:"row",
    paddingTop:"100px",
    justifyContent:"center",
    height:'100%'
  },
  right:{
    height:'100%',
    display:"flex",
    flexDirection:'column',
    justifyContent:'space-between'
  }
}));

const StockPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.stock}>
      <StockDropdown />
      <div className={classes.right}>
      <TransactionHistory/>
      <LiveNotifications/>
      </div>
    </div>
  );
}

export default StockPage;
