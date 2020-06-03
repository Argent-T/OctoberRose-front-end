import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';
import prices from './fixedPrices';
import RadioBox from './Radiobox';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });


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

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP FILTERS", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters);

    }


    return (
        <Layout title="Shop Page" description="Search for stuff" className='container-fluid'>

            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            //props
                            categories={categories}
                            handleFilters={filters => handleFilters(filters, 'category')}

                        />
                    </ul>

                    <h4>Filter by Price Range</h4>
                    <div>
                        <RadioBox
                            //props
                            prices={prices}
                            handleFilters={filters => handleFilters(filters, 'price')}

                        />
                    </div>
                </div>
                <div className="col-8">
                    {JSON.stringify(myFilters)}
                </div>
            </div>


        </Layout>
    )
}

export default Shop;