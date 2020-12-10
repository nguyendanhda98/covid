import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";

Country.propTypes = {};


function Country(props) {

const [Data, setData] = useState([])
const [Vietnam, setVietnam] = useState({})
const [Search, setSearch] = useState("")

useEffect(() => {
    let url = "https://disease.sh/v3/covid-19/countries";

    axios(url).then((response) =>{
          const newData = response.data.sort((a,b) => b.cases - a.cases)
        const newDataLimit = newData.slice(0,10);
        //nhớ delete data (tìm hiểu delete)
        // delete newData;

        setData(newDataLimit);

        //nhớ delete data (tìm hiểu delete)
        // delete newData;
        const newVietnam = response.data.find(item => item.country==="Vietnam");
        setVietnam(newVietnam)

        setAllData(response.data)

    })


    return () => {
        
    }
}, [])

const onChange = (e) => {
    setSearch(e.target.value);
}

const [AllData, setAllData] = useState([])

const search = () => {

var q = Search
    var DataFileter = AllData.filter(function(item){
        return item.country.toLowerCase().indexOf(q.toLowerCase()) !== -1 ;
    });

    const newData = DataFileter.sort((a,b) => b.cases - a.cases)
        const newDataLimit = newData.slice(0,10);
        //nhớ delete data (tìm hiểu delete)
        // delete newData;



        setData(newDataLimit);
}

useEffect(() => {
   
    search();

    return () => {
        
    }
}, [Search])

  return (
    <div>
        
      <div className="KhuVuc"
      style={{display: 'flex'}}>
        <div>
          <p>12345</p>
          <p>Tổng số ca nhiễm</p>
        </div>
        <div>
          <p>12345</p>
          <p>Tổng số ca nhiễm</p>
        </div>
        <div>
          <p>12345</p>
          <p>Tổng số ca nhiễm</p>
        </div>
      </div>
      <div className="search">
          <input type="search" value={Search} onChange={onChange}/>
      </div>
      <div className="list">
          <table class="table">
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

<tr key={0}>
      <th scope="row">{0}</th>
        <td>{Vietnam.country}</td>
      <td>{Vietnam.cases}</td>
      <td>{Vietnam.deaths}</td>
      <td>{Vietnam.recovered}</td>
    </tr>

    {Data.map((item, index) => {
        return(
            <tr key={index +1}>
      <th scope="row">{index+1}</th>
        <td>{item.country}</td>
      <td>{item.cases}</td>
      <td>{item.deaths}</td>
      <td>{item.recovered}</td>
    </tr>
        )
    })}

    
  </tbody>
</table>
      </div>
    </div>
  );
}

export default Country;
