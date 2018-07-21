import React from 'react';
import NavigationBar from './NavigationBar';
import {HeaderComponent} from "./HeaderComponent";

class MarketingAd extends React.Component{
    render(){
        return(
            <div>
                <HeaderComponent/>
                <NavigationBar/>
                <h1>Marketing Ad</h1>
            </div>
        );
    }
}

export default MarketingAd;