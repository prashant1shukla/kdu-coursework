import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import {createUseStyles} from 'react-jss'

interface BarGraphProps {
  basePrice: number | null;
}

const useStyles = createUseStyles(({
  graph:{
    marginTop:"30px",
    border:"1px solid #000"
  }
}));

const BarGraph: React.FC<BarGraphProps> = ({ basePrice }) => {
  const classes = useStyles();
  const [priceChanges, setPriceChanges] = useState<{ value: number; color: string }[]>([]);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);

  // Append new price changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (basePrice !== null) {
        const newPrice = basePrice; 
        const color = previousPrice !== null && newPrice < previousPrice ? '#FFC9C9' : '#B2F2BB'; // Determine color based on price change
        setPriceChanges(prevChanges => [...prevChanges, { value: newPrice, color }]);
        setPreviousPrice(newPrice); 
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [basePrice]); 

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end', // Align items to the right
          }}
        >
        <Box className={classes.graph}
          sx={{
            width: '800px',
            height: '500px',
            position: 'relative',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row-reverse', // Align bars from right to left
            justifyContent: 'flex-end', // Push bars to the right
            backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`, // Add grid background
            backgroundSize: '110px 102px', // Set grid size
          }}
        >
          {priceChanges.map((change, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                width: '20px', // Fixed width for each bar
                height: `${change.value}px`, // Height equal to the new value of base price
                backgroundColor: change.color,
                border: '1px solid black',
                marginTop: 'auto', // Align bars to the bottom
              }}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default BarGraph;
