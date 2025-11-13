import React from 'react'
import type { Subscription } from './api/mock-data'

type Props = {
  subscription: Subscription
  onCancel?: (id: string) => void
}

export default function SubscriptionCard({ subscription, onCancel }: Props) {
  const { id, offerTitle, status, price, currency, nextPaymentDate } = subscription

  const date = new Date(nextPaymentDate)
  const formatted = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const isCancelled = status === 'cancelled'

  return (
    <div className="card">
      <div className="card-left">
        <h3 className="title">{offerTitle}</h3>
        <p className="meta">ID: {id}</p>
        <p className="meta">
          Status: <strong>{status}</strong>
        </p>
      </div>
      <div className="card-right">
        <p className="price">
          {currency === 'USD' ? `$${price.toFixed(2)}` : `${price} ${currency}`}
        </p>
        <p className="renew">Renews on: {formatted}</p>
        <button
          className="cancel"
          onClick={() => onCancel?.(id)}
          disabled={isCancelled}
        >
          {isCancelled ? 'Cancelled' : 'Cancel'}
        </button>
      </div>
    </div>
  )
}
