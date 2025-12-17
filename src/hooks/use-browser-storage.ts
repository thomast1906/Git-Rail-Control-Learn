import { useState, useCallback } from 'react'

/**
 * A hook that works similarly to React.useState, but persists the value using browser localStorage.
 * 
 * @param key - The key under which to store the value in localStorage
 * @param initialValue - The initial value to use if no stored value is found
 * @returns An array containing the current value, a setter function, and a delete function
 */
export function useBrowserStorage<T>(
  key: string,
  initialValue: T
): readonly [T | undefined, (newValue: T | ((oldValue?: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((oldValue?: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const deleteValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(undefined)
    } catch (error) {
      console.error(`Error deleting localStorage key "${key}":`, error)
    }
  }, [key])

  return [storedValue, setValue, deleteValue] as const
}

/**
 * Hybrid storage hook for Git Rail Control.
 * 
 * Uses browser localStorage for maximum compatibility,
 * particularly for GitHub Pages and other static hosting deployments.
 * 
 * @param key - The key under which to store the value in localStorage
 * @param initialValue - The initial value to use if no stored value is found
 * @returns An array containing the current value, a setter function, and a delete function
 */
export function useHybridStorage<T>(
  key: string,
  initialValue: T
): readonly [T | undefined, (newValue: T | ((oldValue?: T) => T)) => void, () => void] {
  return useBrowserStorage(key, initialValue)
}
