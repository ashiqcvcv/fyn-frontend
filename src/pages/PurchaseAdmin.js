import React from 'react'
import { useState, useEffect } from 'react';
let URL = 'http://localhost:3000';

export default function PurchaseAdmin() {

    const [purchaseList, setPurchaseList] = useState([]);

    useEffect(() => {
        fetch(`${URL}/api/list`)
            .then((response) => response.json())
            .then((data) => setPurchaseList(data.priceList));
    }, [])

    function addPurchase() {
        let purchaseTemp = purchaseList;
        purchaseTemp.push({
            name: '', enabled: true, DAP: 0, DBPdistance: 0, DBPprice: 0, TMF: [{ factor: 0, maxlimit: 0 }]
        })
        setPurchaseList(prevState => ([...purchaseTemp]));
    }


    function savePurchase(index) {
        fetch(`${URL}/update/add`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseList[index]),
        }).then((response) => response.json())
            .then((data) => {
                if (data.savedDoc && data.savedDoc._id) {
                    let purchaseTemp = purchaseList;
                    purchaseTemp[index] = data.savedDoc;
                    setPurchaseList(prevState => ([...purchaseTemp]));
                }
            })
    }

    function changeStatus(status, _id) {
        fetch(`${URL}/update/statuschange?_id=${_id}&status=${status}`)
            .then((response) => response.json())
            .then((data) => {
                let purchaseTemp = purchaseList;
                purchaseTemp.some((purchase, i) => {
                    if (purchase._id == _id) {
                        purchaseTemp[i].enabled = status;
                        return true
                    }
                    return false
                })
                setPurchaseList(prevState => ([...purchaseTemp]));
            });
    }

    function handleInputChange(event, index) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        let purchaseTemp = purchaseList;
        purchaseTemp[index][name] = value;
        setPurchaseList(prevState => ([...purchaseTemp]));
    }

    function updateTMF(event, index, tmfInd) {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        let purchaseTemp = purchaseList;
        purchaseTemp[index].TMF[tmfInd][name] = value;
        setPurchaseList(prevState => ([...purchaseTemp]));
    }

    function addTMFRow(index) {
        let purchaseTemp = purchaseList;
        purchaseTemp[index].TMF.push({ factor: 0, maxlimit: 0 })
        setPurchaseList(prevState => ([...purchaseTemp]));
    }

    function removeTMF(index, tmfIndex) {
        let purchaseTemp = purchaseList;
        if (purchaseTemp[index].TMF.length == 1) return alert('minimum one TMF required');
        purchaseTemp[index].TMF.splice(tmfIndex, 1);
        setPurchaseList(prevState => ([...purchaseTemp]));
    }

    return (
        <div className="continer row pt-4">
            <div className='col-2'></div>
            <div className='col-8'>
                <div className='h1'>Purchase List</div>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">DAP</th>
                            <th scope="col">DBP Distance</th>
                            <th scope="col">DBP Price</th>
                            <th scope="col">TMF</th>
                            <th scope="col"></th>
                            <th scope="col">Update</th>
                            <th scope="col">Disable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseList.map((purchase, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>
                                        <div className="form-group">
                                            <input type="text" defaultValue={purchase.name} className="form-control" placeholder="Name" name="name" onChange={(e) => handleInputChange(e, i)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group">
                                            <input type="number" defaultValue={purchase.DAP} className="form-control" placeholder="Distance" name="DAP" onChange={(e) => handleInputChange(e, i)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group">
                                            <input type="number" defaultValue={purchase.DBPdistance} className="form-control" placeholder="Distance" name="DBPdistance" onChange={(e) => handleInputChange(e, i)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group">
                                            <input type="number" defaultValue={purchase.DBPprice} className="form-control" placeholder="Price" name="DBPprice" onChange={(e) => handleInputChange(e, i)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-group col-8">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Factor</th>
                                                        <th scope="col">Maxlimit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {purchase.TMF.map((tmf, ind) => {
                                                        return (
                                                            <tr key={ind + 'tmf'}>
                                                                <td>
                                                                    <input type="number" defaultValue={tmf.factor} className="form-control col-1" placeholder="Factor" name="factor" onChange={(e) => updateTMF(e, i, ind)} />
                                                                </td>
                                                                <td>
                                                                    <input type="number" defaultValue={tmf.maxlimit} className="form-control col-1" placeholder="Maxlimit" name="maxlimit" onChange={(e) => updateTMF(e, i, ind)} />
                                                                </td>
                                                                <td>
                                                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => removeTMF(i, ind)}>x</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    <td><button type="button" className="btn btn-sm btn-primary" onClick={() => addTMFRow(i)}>Add TMF</button></td>
                                    <td><button type="button" className="btn btn-primary" onClick={() => savePurchase(i)}>Save</button></td>
                                    {purchase._id ? (
                                        purchase.enabled ? <td><button type="button" className="btn btn-danger" onClick={() => changeStatus(0, purchase._id)}>Disabled</button></td>
                                            : <td><button type="button" className="btn btn-success" onClick={() => changeStatus(1, purchase._id)}>Enabled</button></td>
                                    ) : ''}
                                </tr>)
                        })}
                    </tbody>
                </table>
                <div className='row col-6'>
                    <div className='col-6'>
                        <button type="button" className="btn btn-secondary" onClick={addPurchase}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
