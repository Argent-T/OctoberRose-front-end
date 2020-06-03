import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';

const Shop = () => {
    return(
        <Layout title = "Home Page" description="Node React E-Commerce App" className='container-fluid'>
           
        <div className="row">
        <div className="col-4">
            left sidebar
        </div>
        <div className="col-4">
            right 
        </div>
        </div>
       
        
        </Layout>
        )
}

export default Shop;