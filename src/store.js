import { WindowsFilled } from '@ant-design/icons'
import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './slice/orderSlice'

export const store = configureStore({
  reducer: {
    orders : orderSlice
  },
})

window.store = store