import React, {useContext, useEffect, useState} from 'react'

export const store = {
  state: {
    user: {name: 'lemon', age: 18},
    group: {name: 'fe'}
  },
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

export const appContext = React.createContext(null)

const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}

const changed = (oldState, newState) => {
  for (const key in oldState) {
    if (oldState[key] !== newState[key]) {
      return true
    }
  }
  return false
}

export const connect = (selector) => (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    const [, update] = useState({})

    const data = selector ? selector(state) : {state}

    useEffect(() => store.subscribe(() => {
      const newData = selector ? selector(store.state) : {state: store.state}
      if (changed(data, newData)) {
        update({})
      }
    }), [selector])

    const dispatch = (action) => {
      setState(reducer(state, action))
    }

    return <Component {...props} {...data} dispatch={dispatch}/>
  }
}
