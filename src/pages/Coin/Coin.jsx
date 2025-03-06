import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';


const Coin = () => {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency, API_KEY} = useContext(CoinContext);

  const fetchCoinData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-1Jyz8KGYDcmAkiPcELjpN2Km'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }

  const fetchHistoricalData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key':'CG-1Jyz8KGYDcmAkiPcELjpN2Km'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency])

if(coinData && historicalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      
      <div className="coin-overview">
        <h2 className='coin-overview-title'>Overview</h2>
        <p className='coin-overview-description'>{coinData.description.en}</p>
      </div>
     
      <div className="coin-chart">
        <h1 className='mt-12 mb-4 pt-4 font-Outfit text-3xl pb-3'>Chart</h1>
        <LineChart historicalData={historicalData}/>
      </div>
      

    <div className="coin-info">
      <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>Market cap</li>
        <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour high</li>
        <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour low</li>
        <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour change</li>
        <li>{coinData.market_data.price_change_percentage_24h.toFixed(2)} %</li>
      </ul>
      <ul>
        <li>24 Hour volume</li>
        <li>{currency.symbol} {coinData.market_data.total_volume[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour market cap</li>
        <li>{currency.symbol} {coinData.market_data.market_cap_change_24h.toFixed(2)}</li>
      </ul>
      <ul>
        <li>24 Hour market cap dominance</li>
        <li>{coinData.market_data.market_cap_change_percentage_24h.toFixed(2)} %</li>
      </ul>
      
      
      
      <div className='knowmore '>
        
        <h2>know more</h2>
        <button className='btn'><a href={coinData.links.homepage[0]} target="_blank" rel="noreferrer">{coinData.name}</a></button>
        
      </div>
      
      
    </div>

    </div>
  )
}else{
  return (
    <div className='spinner'>
      <div className="spin"></div>
    </div>
  )
}
  
}

export default Coin
