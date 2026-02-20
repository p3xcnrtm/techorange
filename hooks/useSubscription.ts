import { useState, useEffect } from 'react';
import { UserSubscription } from '../types';

const STORAGE_KEY = 'techorange_subscription';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<UserSubscription>({
    isSubscribed: false,
    subscriptionDate: null,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSubscription(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse subscription data", e);
      }
    }
  }, []);

  const subscribe = () => {
    const newSub: UserSubscription = {
      isSubscribed: true,
      subscriptionDate: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSub));
    setSubscription(newSub);
  };

  const unsubscribe = () => { // Helper for testing
    const newSub: UserSubscription = { isSubscribed: false, subscriptionDate: null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSub));
    setSubscription(newSub);
  };

  return { subscription, subscribe, unsubscribe };
};