import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';

const Shop = () => {

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)

            } else {
                setCategories(data)
            }
        });
    };


    useEffect(() => {
        init()
    }, [])

    return (
        <Layout title="Shop Page" description="Search for stuff" className='container-fluid'>

            <div className="row">
                <div className="col-4">
                    {JSON.stringify(categories)}
        </div>
                <div className="col-4">
                    right
        </div>
            </div>


        </Layout>
    )
}

export default Shop;