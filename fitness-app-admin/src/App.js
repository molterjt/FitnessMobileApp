import React, { Component } from 'react';

import {HeaderComponent} from './components/HeaderComponent';
import NavigationBar from './components/NavigationBar';
import WeightsBackground from './weights-background.jpg'

let imgStyle = {
    root: {
        backgroundImage: `url(${WeightsBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: "cover",
        height: 1000,
        justifyContent:"center",


    }
};

class App extends Component {
  render() {

    return (

        <div style={{backgroundColor:"black",}}>

                <HeaderComponent/>
                <NavigationBar/>
                <div>
                    <div style={imgStyle.root}>
                        <h1 style={{
                            color:"#fff", textAlign: "center", borderColor:"#red",
                            textShadow: "-1px 2px 10px rgba(0, 0, 0, 0.75)"}}
                        >
                            Welcome to Fitness Mobile App Control Center
                        </h1>
                        <p style={{
                            color:"#000", textAlign: "center", borderColor:"#000000",
                            textShadow: "-1px 2px 10px rgba(0, 0, 0, 0.75)", margin: 40 }}>
                            Use above navigation to view and manage current mobile application state
                        </p>
                    </div>
                </div>




        </div>
    );
  }
}



export default App;


//<img src={"http://backgroundcheckall.com/wp-content/uploads/2017/12/weights-background-10.jpg"} style={imgStyle.root} alt="logo" />