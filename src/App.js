import React, {Suspense, lazy} from 'react';
import { Route, Routes , Navigate, useNavigate } from 'react-router-dom';
import './App.css';

let SignIn = lazy(()=> import('./pages/signin/SignIn'));
let SignUp = lazy(() => import('./pages/signup/NewAccount'));
let NotFound = lazy(() => import('./pages/notfound/NotFound'));
let Connected = lazy(() => import('./pages/connected/Connected'));
let connected = false;
let userName = "";

function App() {

  let navigation = useNavigate()
  function changeConnected(url){    /*fonction qui change le status de connected en true si il est false sinon en false */
    connected=!connected
    navigation(url)
  }
  function getUserName(name){
    userName=name;
  }
  return (
    <Suspense fallback={<h1 className='chargement'>########...loading...#######</h1>}>
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route exact path='/signin' element={<SignIn connection={changeConnected} changeName={getUserName} />}/>
        <Route exact path='/signup' element={<SignUp connection={changeConnected} />}/>
        <Route exact path='/connected' element={<Connected deconnection={changeConnected} user={userName} />}/>
        <Route exact path='/' element={<Navigate to='/signin'/>}/>
      </Routes>
    </Suspense>
  )
}

export default App;
