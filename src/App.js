import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Fetchalldata } from './Services/Module/action'
import 'bootstrap/dist/css/bootstrap.min.css';
import Productlist from './Components/Productlist';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from './Components/Mynavbar';
import Cart from './Components/Cart';
import Productdetails from './Components/Productdetails';
import './App.css'


const App = (props) => {
  // useEffect(() => {
  //   props.getcontries()
  // }, []);
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path='/' element={<Productlist />}></Route>
          <Route path='/cart' element={<Cart />} ></Route>
          <Route path='/productdetails/:id' element={<Productdetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

// export default connect(() => { }, { getcontries: Fetchalldata })(App)
export default App