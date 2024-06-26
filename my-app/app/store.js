import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux'; // 从 redux 导入 combineReducers
import storage from 'redux-persist/lib/storage'; // 使用 localStorage 作为默认存储
import todosReducer from './features/todos/todosSlice'
import counterReducer from './features/todos/counterSlice'
// 持久化配置
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todos', 'counter'] // 这里列出你希望持久化的 reducer
};
// 创建持久化的根 reducer
const rootReducer = {
    todos: todosReducer,
    counter: counterReducer
};
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store);