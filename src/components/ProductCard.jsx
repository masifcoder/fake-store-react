


function ProductCard({product, addToCart}) {

    return (
        <div className="col-md-3">
            <div className="card">
                <img src={product.image} className="card-img-top p-img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-truncate">{product.title}</h5>
                    <p className="card-text text-truncate">
                        {product.description}
                    </p>
                    <a href="#" className="btn btn-primary btn-sm me-2">view</a>
                    <button onClick={() => addToCart(product) } className="btn btn-warning btn-sm">add to cart</button>
                </div>
            </div>
        </div>
    )
}


export default ProductCard