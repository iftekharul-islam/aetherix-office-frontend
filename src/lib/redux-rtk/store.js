import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import dialogReducer from './slices/dialogSlice'
import attendanceReducer from './slices/attendanceSlice'
import { divisionApi } from './apis/divisionApi'
import { departmentApi } from './apis/departmentApi'
import { employeeApi } from './apis/employeeApi'
import { userApi } from './apis/userApi'
import { attendanceApi } from './apis/attendanceApi'

export const store = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      userSlice: userReducer,
      dialogSlice: dialogReducer,
      attendanceSlice: attendanceReducer,
      [divisionApi.reducerPath]: divisionApi.reducer,
      [departmentApi.reducerPath]: departmentApi.reducer,
      [employeeApi.reducerPath]: employeeApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [attendanceApi.reducerPath]: attendanceApi.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        divisionApi.middleware,
        departmentApi.middleware,
        employeeApi.middleware,
        userApi.middleware,
        attendanceApi.middleware
      )
  })
}
