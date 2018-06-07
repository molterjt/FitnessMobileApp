import React from 'react';
import MiamiFitness from '../MiamiFitness.png';


export const HeaderComponent = () => (

    <div className={"App"}>
        <header className="App-header">
            <a href={"/"}>
            <img src={MiamiFitness} className="App-logo" alt="logo" />
            </a>
            <h1 className="App-title">Fitness-App-Admin</h1>
        </header>
    </div>
)