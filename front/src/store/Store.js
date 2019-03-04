import { createStore, combineReducers } from 'redux'
import reducer from './reducer'



const saveToLocalStorage = (state) => {
   try{
     const serializedState = JSON.stringify(state)
     localStorage.setItem('state', serializedState)
   } catch(e){
     console.log(e)
   }
 }

const loadFromLocalStorage = () => {
   try{
       const serializedState = localStorage.getItem('state')
       if (serializedState === null) return undefined
       return JSON.parse(serializedState)
   }   catch(e){
       console.log(e)
       return undefined
   }
}


const persistedState = loadFromLocalStorage()

const store = createStore(
   reducer,
   persistedState,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store