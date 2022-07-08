import React, {useContext} from 'react'
import {appContext, connect, store} from './redux'

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
const User = connect(state => {
  return {user: state.user}
})(({user}) => {
  console.log('User执行了 ' + Math.random())
  return <div>User:{user.name}</div>
})

const UserModifier = connect()(({dispatch, state}) => {
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
