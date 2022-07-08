import React, {useContext, useState} from 'react'

const appContext = React.createContext(null)
export default () => {
  const [appState, setAppState] = useState({
    user: {name: 'lemon', age: 18}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
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
const User = () => {
  console.log('User执行了 ' + Math.random())
  const {appState} = useContext(appContext)
  return <div>User:{appState.user.name}</div>
}

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

const connect = (Component) => {
  return (props) => {
    const {appState, setAppState} = useContext(appContext)

    const dispatch = (action) => {
      setAppState(reducer(appState, action))
    }

    return <Component {...props} dispatch={dispatch} state={appState}/>
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
