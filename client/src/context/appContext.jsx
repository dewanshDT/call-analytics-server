// MyContext.js

import React, { createContext, useState, useContext } from "react"

// Step 1: Create the context
const AppContext = createContext()

// Step 2: Create a provider component
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState()

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider")
  }
  return context
}

export { AppProvider, useAppContext }
