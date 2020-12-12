import "./App.css";
import Country from "./components/Country";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [Data, setData] = useState([]);
  const [AllData, setAllData] = useState([]);

  const [Vietnam, setVietnam] = useState([]);
  const [Input, setInput] = useState("");

  const [Cases, setCases] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Recovered, setRecovered] = useState(0);

  const [Time, setTime] = useState(0);

  useEffect(() => {
    //Get data from API
    let url = "https://disease.sh/v3/covid-19/countries";
    axios(url).then((response) => {
      setAllData(response.data);
      // // Sort countries
      const sortAllData = response.data.sort((a, b) => b.cases - a.cases);

      // // slice 10 countries
      const sliceCountries = sortAllData.slice(0, 10);
      setData(sliceCountries);

      // Vietnam
      const newVietnam = response.data.find(
        (item) => item.country === "Vietnam"
      );
      setVietnam(newVietnam);

      // The world
      let cases = 0;
      let deaths = 0;
      let recovered = 0;
      for (let i of response.data) {
        cases += i.cases;
        deaths += i.deaths;
        recovered += i.recovered;
      }
      setCases(cases);
      setDeaths(deaths);
      setRecovered(recovered);
    });

    //Time update
    var myVar = setInterval(() => setTime(Time + 1), 180000);

    return () => {
      clearInterval(myVar);
    };
  }, [Time]);

  // Search function
  const Search = React.useCallback(
    (e) => {
      setInput(e.target.value);
      const DataFilter = AllData.filter((item) => {
        return item.country.toLowerCase().indexOf(Input.toLowerCase()) !== -1;
      });
      const newData = DataFilter.sort((a, b) => b.cases - a.cases);
      const newDataLimit = newData.slice(0, 10);
      setData(newDataLimit);
    },
    [AllData, Input]
  );

  // render
  return (
    <div className="App">
      <h1>Tình hình Covid-19 hiện tại </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Tổng số ca nhiễm</th>
            <th scope="col">Số ca tử vong</th>
            <th scope="col">Đã bình phục</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Cases}</td>
            <td>{Deaths}</td>
            <td>{Recovered}</td>
          </tr>
        </tbody>
      </table>

      <div className="search">
        <input
          type="search"
          value={Input}
          placeholder="Tìm tên nước..."
          onChange={Search}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nước</th>
            <th scope="col">Tổng số ca nhiễm</th>
            <th scope="col">Số ca tử vong</th>
            <th scope="col">Đã bình phục</th>
          </tr>
        </thead>
        <tbody>
          <Country item={Vietnam} index={0} />
          {Data.map((item, index) => {
            return <Country key={index + 1} item={item} index={index + 1} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
