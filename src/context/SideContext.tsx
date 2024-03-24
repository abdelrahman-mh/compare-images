import React from 'react'
import { Side } from '../utils/types'

const SideContext = React.createContext<Side | undefined>(undefined)

interface SideProviderProps {
  value: Side
  children: React.ReactNode
}

export const SideProvider: React.FC<SideProviderProps> = ({ children, value }) => {
  return <SideContext.Provider value={value}>{children}</SideContext.Provider>
}

export default SideContext
