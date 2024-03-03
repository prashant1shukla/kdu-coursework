import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createUseStyles } from "react-jss";

interface StockData {
  company: string;
  symbol: string;
  data: { date: string; prices: number[] }[];
}

interface StockSummary {
  company: string;
  symbol: string;
  buyDate: string;
  buyPrice: number;
  sellDate: string;
  sellPrice: number;
  maxProfit: number;
}

const useStyles = createUseStyles({
  summarize: {
    paddingTop: "100px",
  },
  item: {
    background: "#007bff",
    borderRadius: "10px",
    marginLeft: "100px",
    marginRight: "100px",
    marginTop: "20px",
    padding: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    margin: "0",
    color: "white",
    fontSize: "10px",
  },
  textCompany: {
    margin: "0",
    color: "white",
    fontSize: "20px",
  },
  left: {
    display: "flex",
    flexDirection: "column",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    paddingTop:'8px'
  },
});

const SummarizerPage: React.FC = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [stockSummaries, setStockSummaries] = useState<StockSummary[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          "https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/all-stocks-transactions.json"
        );
        const data: StockData[] = await response.json();
        console.log("Fetched data:", data); // Log fetched data
        const summaries = computeStockSummaries(data);
        console.log("Computed summaries:", summaries); // Log computed summaries
        setStockSummaries(summaries);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  
  const computeStockSummaries = (stockData: StockData[] | undefined): StockSummary[] => {
    const summaries: StockSummary[] = [];
    if (!stockData) {
      return summaries;
    }
  
    stockData.forEach((stock) => {
      if (!stock.data) {
        return;
      }
  
      let maxProfit = 0;
      let buyDate = "";
      let buyPrice = 0;
      let sellDate = "";
      let sellPrice = 0;
  
      stock.data.forEach((dayData) => {
        if (!dayData.prices) {
          return;
        }
  
        for (let i = 0; i < dayData.prices.length; i++) {
          for (let j = i + 1; j < dayData.prices.length; j++) {
            const profit = dayData.prices[j] - dayData.prices[i];
            if (profit > maxProfit) {
              maxProfit = profit;
              buyDate = formatDate(dayData.date); 
              buyPrice = dayData.prices[i];
              sellDate = formatDate(dayData.date); 
              sellPrice = dayData.prices[j];
            }
          }
        }
      });
  
      summaries.push({
        company: stock.company,
        symbol: stock.symbol,
        buyDate,
        buyPrice,
        sellDate,
        sellPrice,
        maxProfit,
      });
    });
  
    return summaries;
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.summarize}>
      {stockSummaries.map((summary, index) => (
        <div key={index} className={classes.item}>
          <div className={classes.left}>
            <h3 className={classes.textCompany}>{summary.company}</h3>
            <p className={classes.text}>Profit Margin: 	&#8377; {summary.maxProfit}</p>
          </div>

          <div className={classes.right}>
            <p className={classes.text}>
            Buy: &#8377;{summary.buyPrice} on{" "} {summary.buyDate} 
            </p>
            <p className={classes.text}>
            Sell: &#8377;{summary.sellPrice} on {" "} {summary.sellDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummarizerPage;
