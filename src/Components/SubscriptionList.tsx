import React, { useEffect, useState } from 'react'
import { fetchSubscriptions } from '../api/fetchSubscription'
import type { Subscription } from '../api/mock-data'
import SubscriptionCard from '../SubscriptionCard'

const SubscriptionList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchSubscriptions()
        if (mounted) setSubscriptions(data)
      } catch (err) {
        console.error(err)
        if (mounted) setError('Failed to load subscriptions.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  const handleCancel = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'cancelled' } : s))
    )
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>
  if (subscriptions.length === 0) return <p>No active subscriptions found.</p>

  return (
    <div>
      <h2>Your subscriptions</h2>
      <div className="list">
        {subscriptions.map((s) => (
          <SubscriptionCard
            key={s.id}
            subscription={s}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  )
}

export default SubscriptionList
