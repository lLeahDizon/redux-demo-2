import React, {useState, useContext} from 'react'

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
const 大儿子 = () => <section>大儿子<User/></section>
const 二儿子 = () => <section>二儿子<UserModifier/></section>
const 三儿子 = () => <section>三儿子</section>
const User = () => {
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

const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    setAppState(reducer(appState, {
      type: 'updateUser',
      payload: {name: e.target.value}
    }))
  }
  return <div>
    <input value={appState.user.name}
           onChange={onChange}/>
  </div>
}
