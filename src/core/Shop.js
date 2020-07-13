import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import prices from './fixedPrices';
import RadioBox from './Radiobox';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(6);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);


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

    const loadFilteredResults = (newFilters) => {
        //console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data =>{
            if(data.error){
                setError(data.error);
            } else{
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            //    console.log(data.data);
            }
        });

    };


    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredProducts(toSkip, limit, myFilters.filters).then(data =>{
            if(data.error){
                setError(data.error);
            } else{
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            //    console.log(data.data);
            }
        });

    };

    const loadMoreButton =() => {
        return(
            size> 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }



    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
        
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP FILTERS", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if(filterBy === "price"){
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);

    };

    const handlePrice = value => {
        const data = prices;
        let array = [];
        for(let i in data){
            if(data[i]._id === parseInt(value)){
                array = data[i].array;
            }
        }
        return array;
    };

    



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
                   <h2 className="mb-4">Products</h2>
                   <div className="row">
                       {filteredResults.map((product, i)=>(
                          <div Key={i} className ="col-4 mb-3">
                          <Card product={product} />
                          </div>
                           
                       ))}
                   </div>
                   <hr></hr>
                   {loadMoreButton()}
                </div>
            </div>


        </Layout>
    )
}

export default Shop;