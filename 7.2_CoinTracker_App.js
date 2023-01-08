import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState(1);
  const [myMoney, setMyMoney] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChangeSelect = (event) => {
    setSelected(parseInt(event.target.value));
  };

  const onChangeInput = (event) => {
    setMyMoney(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeSelect}>
          {coins.map((coin) => (
            <option value={coin.rank} key={coin.id}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        <input
          type="number"
          value={myMoney}
          onChange={onChangeInput}
          placeholder="Please write your USD"
        />{" "}
        $
      </div>
      <div>
        {coins.map((coin) => {
          if (coin.rank === selected) {
            return (
              <h3 key={coin.id}>
                {" -> "}
                {myMoney / coin.quotes.USD.price} {coin.symbol}
              </h3>
            );
          }
          return;
        })}
      </div>
    </div>
  );
}

export default App;
