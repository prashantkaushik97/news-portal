import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import Select from 'react-select'
import { Grid } from '@material-ui/core';

import './Style.css'
function News() {
    const apiKey = "262ca29f445840a596e6301fc64290dd"
    const [country, setcountry] = useState("")
    const [category, setcategory] = useState("")
    const [keyword, setkeyword] = useState("")
    const [flag, setflag] = useState(false)
    const [responseArray, setresponseArray] = useState([])
    const categories = [
        { value: 'business', label: 'Business' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'general', label: 'General' },
        { value: 'health', label: 'Health' },
        { value: 'science', label: 'Science' },
        { value: 'sports', label: 'Sports' },
        { value: 'technology', label: 'Technology' }

    ]
    const countries = [
        { value: 'ae', label: 'UAE' },
        { value: 'ar', label: 'Argentina' },
        { value: 'at', label: 'Austria' },
        { value: 'au', label: 'Australia' },
        { value: 'be', label: 'Belgium' },
        { value: 'bg', label: 'Bulgaria' },
        { value: 'br', label: 'Brazil' },
        { value: 'ca', label: 'Canada' },
        { value: 'cn', label: 'China' },
        { value: 'co', label: 'Colombia' },
        { value: 'cu', label: 'Cuba' },
        { value: 'cz', label: 'Czech Republic' },
        { value: 'de', label: 'Denmark' },
        { value: 'eg', label: 'Egypt' },
        { value: 'fr', label: 'France' },
        { value: 'gr', label: 'Greece' },
        { value: 'hk', label: 'Hong Kong' },
        { value: 'hu', label: 'Hungary' },
        { value: 'id', label: 'Indonesia' },
        { value: 'ie', label: 'Ireland' },
        { value: 'in', label: 'India' },
        { value: 'jp', label: 'Japan' },
        { value: 'kr', label: 'Korea' },
        { value: 'mx', label: 'Mexico' },
        { value: 'us', label: 'United States of America' },
        { value: 'ua', label: 'Ukraine' }

    ]
    const handleSubmit = async (e) => {
        e.preventDefault()
        setflag(!flag)
    }
    useEffect(() => {
        setresponseArray([])

        axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`).then((res) => {
            setresponseArray(responseArray => [...responseArray, res.data.articles])
        })
    }, [category])
    useEffect(() => {
        setresponseArray([])

        axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`).then((res) => {
            setresponseArray(responseArray => [...responseArray, res.data.articles])

        })
    }, [flag])
    return (

        < div className="news" >
            {console.log(responseArray)}
            <div className='header'>
                <div className='header__logo'>
                    News App
                </div>
                <div className='header__search'>
                    <form onSubmit={handleSubmit}>

                        <input className='header__searchinput' onChange={e => { setkeyword(e.target.value) }} type="text" placeholder="Search news by keywords"></input>
                        <input type='submit' value='Go' className='header__searchButton'  ></input>
                    </form>

                </div>
            </div>
            <div>
                <Select placeholder={<div>Country</div>} options={countries} onChange={(value) => {
                    setcountry(value.value)
                }} />
                <Select placeholder={<div>Category</div>} options={categories} onChange={(value) => {
                    setcategory(value.value)
                }} />

            </div>
            <div>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {responseArray[0]?.map((news, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <NewsCard title={news.title} description={news.description} author={news.author} url={news.url} urlToImage={news.urlToImage} />
                        </Grid>

                    ))
                    }
                </Grid>
            </div>


        </div >
    )
}

export default News
