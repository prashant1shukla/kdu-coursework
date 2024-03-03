import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { Stock } from "../../types/Stock";
import { updateWallet } from "../../redux/slices/walletSlice";
import { addTransaction } from "../../redux/slices/transactions";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import BarGraph from "./BarGraph";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  stocks: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "10px",
  },
  dropDown: {
    padding: "5px",
    border: "1px solid #000",
    minWidth: "200px",
    fontSize:"15px"
  },
  basePrice: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border:"1px solid #000",
    padding:"5px"
  },
  price: {
    paddingLeft: "10px",
    color: "inherit", 
    fontSize:'20px',
    paddingRight:"10px",
    maxWidth:"100px"
  },
  price2: {
    fontSize:'20px',
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  arrow: {
    marginLeft: "5px",
  },
});

const StockDropdown: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector(
    (state: RootState) => state.explore
  );
  const walletBalance = useSelector((state: RootState) => state.wallet.balance);
  const { id } = useParams<{ id: string }>();
  const [selectedStock, setSelectedStock] = useState<string | null>(`${id}`);
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleStockSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedSymbol = event.target.value as string;
    setSelectedStock(selectedSymbol);
    const selectedStock = stocks.find(
      (stock) => stock.stock_symbol === selectedSymbol
    );
    if (selectedStock) {
      setBasePrice(selectedStock.base_price);
    } else {
      setBasePrice(null);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value) || 0);
  };

  const handleBuy = () => {
    if (basePrice && quantity * basePrice <= walletBalance) {
      dispatch(updateWallet(walletBalance - quantity * basePrice));
      dispatch(
        addTransaction({
          stock_name: selectedStock || "",
          stock_symbol: selectedStock || "",
          transaction_price: basePrice,
          timestamp: new Date().toISOString(),
          status: "Buy",
        })
      );

      // Reset quantity
      setQuantity(0);
    } else {
      alert("Insufficient balance or invalid quantity");
    }
  };

  const handleSell = () => {
    dispatch(updateWallet(walletBalance + quantity * basePrice!));
    dispatch(
      addTransaction({
        stock_name: selectedStock || "",
        stock_symbol: selectedStock || "",
        transaction_price: basePrice!,
        timestamp: new Date().toISOString(),
        status: "Sell",
      })
    );
  };

  useEffect(() => {
    setSelectedStock(`${id}`);
    const selectedStock = stocks.find(
      (stock) => stock.stock_symbol === `${id}`
    );
    if (selectedStock) {
      setBasePrice(selectedStock.base_price);
    } else {
      setBasePrice(null);
    }
  }, [id, stocks]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (basePrice !== null) {
        setPrevPrice(basePrice); 
        setBasePrice(generateRandomPrice());
      }
    }, 5000);

    return () => clearInterval(interval); 
  }, [basePrice]);

  // Function to generate random price between 0 and 500
  const generateRandomPrice = () => {
    return Math.floor(Math.random() * 501); []
  };

  // Calculate percentage change between two prices
  const calculatePercentageChange = (prevPrice: number, newPrice: number) => {
    return ((newPrice - prevPrice) / prevPrice) * 100;
  };

  // Determine color and arrow direction based on previous price
  const priceColor = prevPrice !== null && basePrice !== null ?
    basePrice > prevPrice ? classes.green :
    basePrice < prevPrice ? classes.red : "" :
    "";

  const arrowDirection = basePrice !== null && prevPrice !== null ?
    basePrice > prevPrice ? "↑" :
    basePrice < prevPrice ? "↓" : "" :
    "";

  const percentageChange = prevPrice !== null && basePrice !== null ?
    `${calculatePercentageChange(prevPrice, basePrice).toFixed(2)}%` :
    "";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.stocks}>
      <Box display="flex" alignItems="center">
        <FormControl
          variant="standard"
          sx={{ minWidth: 120, mr: 2 }}
          className={classes.dropDown}
        >
          <Select
            value={selectedStock || ""}
            displayEmpty
            onChange={handleStockSelect}
            inputProps={{ "aria-label": "Select stock" }}
          >
            <MenuItem value="" disabled>
              Select Stock
            </MenuItem>
            {stocks.map((stock: Stock) => (
              <MenuItem key={stock.stock_symbol} value={stock.stock_symbol}>
                {`${stock.stock_symbol} - ${stock.stock_name}`}{" "}
                {/* Display symbol and name */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.basePrice}>
          <Typography className={classes.price2}>Price</Typography>
          <Typography variant="body1" className={`${classes.price} ${priceColor}`}>
            {selectedStock && basePrice ? `${basePrice}` : ""}
            {arrowDirection && <span className={classes.arrow}>{arrowDirection}</span>}
          </Typography>
          <Typography variant="body1">{percentageChange}</Typography>
        </div>
        <TextField
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          variant="outlined"
          size="small"
          label="Enter QTY" 
          sx={{ marginLeft: 2 }}
        />
        <Button variant="contained" onClick={handleBuy} sx={{ marginLeft: 1, bgcolor: '#B2F2BB', color: 'green' }} >
          Buy
        </Button>
        <Button variant="contained" onClick={handleSell} sx={{ marginLeft: 1, bgcolor: '#FFC9C9', color: 'red' }} >
          Sell
        </Button>
      </Box>
      <BarGraph basePrice={basePrice} />
      <div />
    </div>
  );
};

export default StockDropdown;
