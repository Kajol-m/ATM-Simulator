
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Welcome from './components/Welcome/Welcome'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import Deposit from './components/Services/Deposit/Deposit'
import Withdraw from './components/Services/Withdraw/Withdraw'
import Transfer from './components/Services/Transfer/Transfer'
import BalanceEnquiry from './components/Services/BalanceInquiry/BalanceEnquiry'
import AfterService from './components/AfterService/AfterService'
import Thankyou from './components/Thankyou/Thankyou'

function App() {

  return (
    <Routes>
      <Route path="/" element ={<Welcome/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/register" element ={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/deposit" element={<Deposit/>}/>
      <Route path="/withdraw" element={<Withdraw/>}/>
      <Route path="/transfer" element={<Transfer/>}/>
      <Route path="/balance" element={<BalanceEnquiry/>}/>
      <Route path="/afterdashboard" element={<AfterService/>}/>
      <Route path="/thankyou" element={<Thankyou/>}/>
    </Routes>
  )
}

export default App
