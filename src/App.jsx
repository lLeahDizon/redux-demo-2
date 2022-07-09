import React from 'react'
import {connect, createStore, Provider} from './redux'
import {userConnect} from './connecters/connectToUser'

const initState = {
  user: {name: 'lemon', age: 18},
  group: {name: 'fe'}
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

const store = createStore(reducer, initState)

export default () => {
  return (
    <Provider store={store}>
      <大儿子/>
      <二儿子/>
      <三儿子/>
    </Provider>
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
const 三儿子 = connect(state => {
  return {group: state.group}
})(({group}) => {
  console.log('三儿子执行了 ' + Math.random())
  return <section>三儿子
    <div>Group:{group.name}</div>
  </section>
})

const User = userConnect(({user}) => {
  console.log('User执行了 ' + Math.random())
  return <div>User:{user.name}</div>
})

const UserModifier = userConnect(({updateUser, user}) => {
  console.log('UserModifier执行了 ' + Math.random())
  const onChange = (e) => {
    updateUser({name: e.target.value})
  }
  return <div>
    <input value={user.name}
           onChange={onChange}/>
  </div>
})
