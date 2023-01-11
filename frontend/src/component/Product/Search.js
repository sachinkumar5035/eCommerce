import React, { Fragment, useState } from 'react';
import MetaData from '../layout/MetaData';
import "./Search.css"
import { useNavigate } from 'react-router-dom';


const Search = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchButtonHandler = (e) => {
        e.preventDefault(); // page will not reload after submit
        if (keyword.trim()) {
            // history.push(`/products/${keyword}`);
            navigate(`/products/${keyword}`);
        } else {
            // history.push("./products");
            navigate(`/products`);
        }
    };

    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE" />
            <form className='searchBox' onSubmit={searchButtonHandler}>
                <input type="text"
                    placeholder='Search a product...'
                    onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
