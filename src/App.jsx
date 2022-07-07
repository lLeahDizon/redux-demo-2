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
  const contextValue = useContext(appContext)
  return <div>User:{contextValue.appState.user.name}</div>
}
const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
  }
  return <div>
    <input value={appState.user.name}
           onChange={onChange}/>
  </div>
}
