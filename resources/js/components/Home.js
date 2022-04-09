import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { getCrypto } from '../http/cryptoAPI';

const Home = observer(() => {

    useEffect(() => {
        getCrypto('BTC,ETH,XRP', '30d').then(res => {
            console.log(res);
        }).finally((e) => {
            console.log(e);
        })
    })

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center">
                        <div className="card-header"><h2>React Component in Laravel</h2></div>
                        <div className="card-body">I'm tiny React component in Laravel app!</div>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default Home;

