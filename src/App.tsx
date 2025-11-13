import React from 'react'
import './index.css'
import SubscriptionList from './Components/SubscriptionList'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Subscription Manager</h1>
      </header>
      <main>
 <SubscriptionList />
      </main>
    </div>
  )
}
