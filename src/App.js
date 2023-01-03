import './App.css';
import PurchaseAdmin from './pages/PurchaseAdmin';
import Calculate from './pages/Calculate';
import React, { useState } from 'react';

function App() {

  const [selectedTab, setSelectedTab] = useState("purchaselist");
  return (
    <React.Fragment>
      <ul className="nav nav-pills m-4" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className={`nav-link ${selectedTab == 'purchaselist' ? 'active' : ''}`} onClick={() => setSelectedTab('purchaselist')} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Purchase List</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link ${selectedTab == 'calculate' ? 'active' : ''}`} onClick={() => setSelectedTab('calculate')} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Calculate</button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className={`tab-pane ${selectedTab == 'purchaselist' ? 'show active' : 'fade'}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <PurchaseAdmin />
        </div>
        <div className={`tab-pane ${selectedTab == 'calculate' ? 'show active' : 'fade'}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <Calculate />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App;
