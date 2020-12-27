/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import * as colors from './styles/colors'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from './utils/api-client'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner} from './components/lib'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function App() {
  // 🐨 useState for the user
  const {
    data,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync()
  React.useEffect(() => {
    run(getUser()).then(u => setData(u))
  }, [])
  const login = form => auth.login(form).then(u => setData(u))
  const register = form => auth.register(form).then(u => setData(u))
  const logout = () => auth.logout().then(u => setData(null))

  if (isLoading || isIdle) {
  }
  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  return isSuccess ? (
    <AuthenticatedApp user={data} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )

  // return <UnauthenticatedApp />
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
