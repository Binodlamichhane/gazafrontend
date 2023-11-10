import './App.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
function App() {
  const [data,setData]=useState([]);
  const [name,setName]=useState('');
  const [categories,setCategories]=useState('');
  const [price,setPrice]=useState(0);
  useEffect(()=>{
    axios.get('https://goldfish-app-r2ouy.ondigitalocean.app/api/product/myproduct')
    .then((res)=>{setData(res.data);
      console.log("response from api",res.data);})
    .catch((error)=>{console.log("error while fetching data",error)})
  },[])
  const handleNameChange=(event)=>{
    setName(event.target.value);
  }
  const handlePriceChange=(event)=>{
    setPrice(event.target.value);
  }
  const handleCategoriesChange=(event)=>{
    setCategories(event.target.value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const datacombine={
      name:name,
      price:price,
      categories:categories
    }
    axios.post('https://goldfish-app-r2ouy.ondigitalocean.app/api/product/addproduct',datacombine)
    .then((res)=>{console.log('data send to exprees successfullu')})
    .catch(()=>{console.log('error while sending data to express');});
  }
  return (
    <div className="App">
        <p>this is front end page </p>
        <div style={{alignItems:''}}>
          {data.map((subdata)=>{
            return <div>
              <h1>{subdata.name}</h1>
              <h2>{subdata.categories}</h2>
              <h3>{subdata.price}</h3>
            </div>
          })}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label for='name'>Name:</label>
            <input name='name' type='text' value={name} onChange={handleNameChange}/><br/>
            <label for='price'>Price:</label>
            <input name='price' type='number' value={price} onChange={handlePriceChange}/><br/>
            <label for='cate'>Categories:</label>
            <input name= 'cate' type='text' value={categories} onChange={handleCategoriesChange}/><br/>
            <input type='submit' value='submit'/>
          </form>
        </div> 
    </div>
  );
}

export default App;
