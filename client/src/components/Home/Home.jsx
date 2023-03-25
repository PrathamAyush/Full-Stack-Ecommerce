import React from 'react'
import { Helmet } from 'react-helmet-async'
import HomeCover from './HomeCover'
import RecentlyAdded from './RecentlyAdded'
import FeaturedProductSlider from './FeturedProductSlider'

const Home = () => {
    return (
        <div>
            <Helmet><title>eCommerce</title></Helmet>
            <HomeCover />
            <RecentlyAdded />
            <FeaturedProductSlider />
        </div>
    )
}

export default Home