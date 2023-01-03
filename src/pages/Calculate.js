import React, { useState, useEffect } from 'react'
let URL = 'http://localhost:3000';

export default function Calculate() {
    const [purchaseList, setPurchaseList] = useState([]);
    const [calculatedValue, setCalculatedValue] = useState('');
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);
    const [priceId, setPriceId] = useState();

    useEffect(() => {
        fetch(`${URL}/api/list`)
            .then((response) => response.json())
            .then((data) => setPurchaseList(data.priceList));
    }, [])

    function CalculateValue() {
        fetch(`${URL}/api/calculate`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priceId, distance: distance, time }),
        }).then((response) => response.json())
            .then((data) => {
                if (data.Price) setCalculatedValue(data.Price);
            })
    }

    return (
        <div className="continer row pt-4">
            <div className='col-2'></div>
            <div className='col-8'>
                <div className="form-group col-4">
                    <label htmlFor="exampleFormControlSelect1">Select Price List</label>
                    <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => {setPriceId(e.target.value);setCalculatedValue('')}} >
                        <option disabled selected>Select</option>
                        {purchaseList.map(purchase => {
                            if ( !purchase.enabled ) return;
                            return <option key={purchase._id} value={purchase._id}>{purchase.name}</option>
                        })}
                    </select>
                </div>
                <div className="col-4 py-4">
                    <input type="number" className="form-control" placeholder="Distance in Km" onChange={(e) => {setDistance(e.target.value);setCalculatedValue('')}} />
                </div>
                <div className="col-4">
                    <input type="number" className="form-control" placeholder="Time in hour" onChange={(e) => {setTime(e.target.value);setCalculatedValue('')}} />
                </div>
                <div className='py-4 row'>
                    <div className="col-2">
                        <button type="button" className="btn btn-primary" onClick={() => CalculateValue()}>Calculate</button>
                    </div>
                </div>
                <h1>{calculatedValue}</h1>
            </div>
        </div>
    )
}
