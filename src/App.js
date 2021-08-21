import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=> {
      setCoins(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div className="coin-app">
      <div className="coin-search">
        <form>
          <input  type="text" 
                  placeholder='Search a coin' 
                  className='coin-input'
                  onChange={handleChange}/>
        </form>
      </div>
      <div className='coin-container'>
        {filteredCoins.map(coin => {
          return (
            <Coin key={coin.id} 
                  image={coin.image} 
                  name={coin.name} 
                  symbol={coin.symbol}
                  price={coin.current_price}
                  volume={coin.total_volume}
                  priceChange={coin.price_change_percentage_24h}
                  marketCap={coin.market_cap}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
