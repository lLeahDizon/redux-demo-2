import React, {useContext, useEffect, useState} from 'react'

const store = {
  state: undefined,
  reducer: undefined,
  setState(newState) {
    store.state = newState
    store.listeners.map(fn => fn())
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.split(index, 1)
    }
  }
}

export const createStore = (reducer, initState) => {
  store.state = initState
  store.reducer = reducer
  return store
}

export const appContext = React.createContext(null)

const changed = (oldState, newState) => {
  for (const key in oldState) {
    if (oldState[key] !== newState[key]) {
      return true
    }
  }
  return false
}

export const connect = (selector, dispatchSelector) => (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)

    const dispatch = (action) => {
      setState(store.reducer(state, action))
    }

    const [, update] = useState({})

    const data = selector ? selector(state) : {state}
    const dispatchers = dispatchSelector ? dispatchSelector(dispatch) : {dispatch}

    useEffect(() => store.subscribe(() => {
      const newData = selector ? selector(store.state) : {state: store.state}
      if (changed(data, newData)) {
        update({})
      }
    }), [selector])

    return <Component {...props} {...data} {...dispatchers}/>
  }
}
