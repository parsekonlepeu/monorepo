import { AnyAction } from '@reduxjs/toolkit'
import React, { Context } from 'react'
import {
  TypedUseSelectorHook,
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
  ReactReduxContextValue,
} from 'react-redux'
import type { RootState, AppDispatch } from '../../store/store'

export const contextPerso = React.createContext(null) as any

export const useStore = createStoreHook(contextPerso)
export const useDispatch = createDispatchHook(contextPerso)
export const useSelector = createSelectorHook(contextPerso)
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector