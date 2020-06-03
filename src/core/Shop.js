import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';

const Shop = () => {

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)

            } else {
                setCategories(data.data)
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleFilters =(filters, filterBy) => {
        console.log("SHOP FILTERS", filters, filterBy);
    }


    return (
        <Layout title="Shop Page" description="Search for stuff" className='container-fluid'>

            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                   <ul> 
                       <Checkbox 
                         //props
                        categories = {categories}
                        handleFilters={ filters => handleFilters(filters, 'category')}
                        
                        />
                   </ul>
        </div>
                <div className="col-4">
                    right
        </div>
            </div>


        </Layout>
    )
}

export default Shop;