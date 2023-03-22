import React from 'react'
import HomeCover from './HomeCover'
import RecentlyAdded from './RecentlyAdded'
import FeaturedProductSlider from './FeturedProductSlider'

const Home = () => {
    return (
        <div>
            <HomeCover />
            <RecentlyAdded />
            <FeaturedProductSlider />
        </div>
    )
}

export default Home