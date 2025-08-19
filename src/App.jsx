import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {

    setLoading(true);
    
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {

        console.log(response.data);
        setProducts(response.data);


      })
      .catch((error) => {
        console.log(error.message)
      })
      .finally(() => {
        setLoading(false);
      })



  }, []);

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='py-3 text-center'>Fake Store Application</h1>

        {
          (loading == true) ? <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div> : null
        }


        {
          products.map((product) => {
            return <>
              <h3>{product.title}</h3>
            </>
          })
        }
      </div>
    </>
  )
}

export default App
