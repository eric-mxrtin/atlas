"use client"
import { useEffect } from 'react'
export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { ping } = await import('ldrs')
      ping.register()
    }
    getLoader()
  }, [])
  return <l-ping size="45" speed="2" color="navy"></l-ping>
}