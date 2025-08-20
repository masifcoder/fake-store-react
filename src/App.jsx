import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart]       = useState([]);


// add to cart
const addToCart  = (product) => {

    let updatedCart = [...cart, product];

    setCart(updatedCart);

}

  useEffect(() => {

    setLoading(true);

    axios.get('https://fakestoreapi.com/products')
      .then((response) => {

        console.log(response.data);
        setProducts(response.data);


      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      })



  }, []);

  return (
    <>
      <Navbar cart={cart} />
      <div className='container'>
        <h1 className='py-3 text-center'>Fake Store Application</h1>

        {
          (loading == true) ? <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> : null
        }


        <div className='row g-4'>
          {
            products.map((product) => {
              return <ProductCard  product={product} addToCart={addToCart} key={product.id} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
