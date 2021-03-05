import React, {useEffect} from 'react'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import state from './lib/state'

const Home = React.lazy(() => import('./views/Home'))
const Chat = React.lazy(() => import('./views/Chat'))
const Door = React.lazy(() => import('./views/Door'))

export const Routes = {
  HOME:    '/',
  CHAT:    '/chat',
  LOG_IN:  '/login',
  SIGN_UP: '/signup',
}

const SignIn = {
  button: 'Enter',
  link: 'create an account',
  route: Routes.SIGN_UP
}

const SignUp = {
  button: 'Register',
  link: 'enter to your account',
  route: Routes.LOG_IN
}

function Router() {
  const history = useHistory()
  useEffect(() => {
    const routes = Object.values(Routes)
    const { pathname } = history.location
    if (!routes.includes(pathname)) {
      history.push(state.hash
        ? Routes.CHAT
        : Routes.HOME
      )
    }
  }, [])
  return <React.Fragment/>
}

export default function Chatty() {
  return (
    <BrowserRouter>
      <Switch>
        <React.Suspense fallback={<span/>}>
          <Route exact path='/'><Home/></Route>
          <Route path={Routes.CHAT}><Chat/></Route>
          <Route path={Routes.LOG_IN}><Door text={SignIn}/></Route>
          <Route path={Routes.SIGN_UP}><Door text={SignUp}/></Route>
          <Route><Router/></Route>
        </React.Suspense>
      </Switch>
    </BrowserRouter>
  )
}
