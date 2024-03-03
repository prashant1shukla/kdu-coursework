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
  status: {
    paddingRight: "15px",
    paddingTop: "10px",
    alignItems: "center",
  },
  stock: {
    paddingLeft: '15px',
  },
  time:{
    fontSize:'10px'
  },
  buy: {
    color: 'green',
  },
  sell: {
    color: 'red',
  },
});

const TransactionHistory: React.FC = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const classes = useStyles();

  const formatDate = (timestamp: string) => {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
  };

  return (
    <div className={classes.history}>
      <Box sx={{ width: '100%', maxHeight: 200, overflowY: 'auto', marginTop: 2 }}>
        <Typography variant="h6">History</Typography>
        {transactions.map((transaction: Transaction, index: number) => (
          <Box key={index} sx={{ marginTop: 1 }}>
            <div className={classes.historyMessage}>
              <div className={classes.stock}>
                <Typography>{`${transaction.transaction_price} Stocks`}</Typography>
                <Typography className={classes.time}>{formatDate(transaction.timestamp)}</Typography>
              </div>
              <Typography
                className={`${classes.status} ${
                  transaction.status === 'Buy' ? classes.buy : classes.sell
                }`}
              >
                {`${transaction.status}`}
              </Typography>
            </div>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default TransactionHistory;
