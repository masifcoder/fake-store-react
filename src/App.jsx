import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';

import './App.css'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);


  const addedCartNotify = () => toast.success("Product successfully added to cart");
  const alreadyExistNotify = () => toast.error("Product already in cart");


  // add to cart
  const addToCart = (product) => {

    let alreadyAdded = cart.find((elem) => elem.id == product.id);

    if (alreadyAdded == undefined) {
      let updatedCart = [...cart, product];
      setCart(updatedCart);
      addedCartNotify();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alreadyExistNotify();
    }

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
              return <ProductCard product={product} addToCart={addToCart} key={product.id} />
            })
          }
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
