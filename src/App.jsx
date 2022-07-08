import React, {useContext, useEffect, useState} from 'react'

const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    const [, update] = useState({})

    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])

    const dispatch = (action) => {
      setState(reducer(state, action))
    }

    return <Component {...props} dispatch={dispatch} state={state}/>
  }
}

const appContext = React.createContext(null)

const store = {
  state: {
    user: {name: 'lemon', age: 18}
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

export default () => {
  return (
    <appContext.Provider value={store}>
      <大儿子/>
      <二儿子/>
      <三儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => {
  console.log('大儿子执行了 ' + Math.random())
  return <section>大儿子<User/></section>
}
const 二儿子 = () => {
  console.log('二儿子执行了 ' + Math.random())
  return <section>二儿子<UserModifier/></section>
}
const 三儿子 = () => {
  console.log('三儿子执行了 ' + Math.random())
  return <section>三儿子</section>
}
const User = connect(() => {
  console.log('User执行了 ' + Math.random())
  const {state} = useContext(appContext)
  return <div>User:{state.user.name}</div>
})

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

const UserModifier = connect(({dispatch, state}) => {
  console.log('UserModifier执行了 ' + Math.random())
  const onChange = (e) => {
    dispatch({
      type: 'updateUser',
      payload: {name: e.target.value}
    })
  }
  return <div>
    <input value={state.user.name}
           onChange={onChange}/>
  </div>
})
