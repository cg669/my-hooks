import React from "react"
import Navbar from "./../../components/Navbar"
import { Switch, Route, Router } from "./../../util/router.js"

import Divider from "./../../components/Divider"

import Footer from "./../../components/Footer"

import { ProvideAuth } from "./../../util/auth.js"

import Loadable from 'react-loadable'

import { Helmet } from 'react-helmet'

import "./styles.scss"


const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    // NProgress.done()
    return null;
  }
}

const AsyncHomePage = Loadable({
  loader: () => import("./../home"),
  loading: MyLoadingComponent
})

const AsyncAboutPage = Loadable({
  loader: () => import("./../about"),
  loading: MyLoadingComponent
})

const AsyncContactPage = Loadable({
  loader: () => import("./../contact"),
  loading: MyLoadingComponent
})

const routeList = [
  {
    path: '/home',
    component: AsyncHomePage,
    title: '首页',
  },
  {
    path: '/about',
    component: AsyncAboutPage,
    title: '其他',
  },
  {
    path: '/contact',
    component: AsyncContactPage,
    title: '联系我们',
  }
]
// const WithTitleRoute = ({ component: Component, title, ...rest }) => {
//   return (
//     <Route {...rest} render={routeProps => (
//       <Component {...routeProps} />
//     )} />
//   )
// }




const NotFound = ({ location }) => {
  return (
    <div
      style={{
        padding: "50px",
        width: "100%",
        textAlign: "center"
      }}
    >
      The page <code>{location.pathname}</code> could not be
      found.
    </div>
  );
}

const WithTitleRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => (
      <>
        <Helmet>
          <title>{rest.title}</title>
        </Helmet>
        <Component {...routeProps} />
      </>
    )} />
  )
}

function generateRoute(list) {
  return list && list.length > 0 && list.map((item, index) => (
    <WithTitleRoute
      exact
      key={index}
      {...item}
    />
  )
  )
}

function App(props) {
  return (
    <ProvideAuth>
      <Router>
        <>
          <Navbar
            color="primary"
            spaced={true}
            logo="https://uploads.divjoy.com/logo-white.svg"
          />

          <Switch>
            <Route exact path="/" component={AsyncHomePage} />
            {
              generateRoute(routeList)
            }
            <Route component={NotFound} />
          </Switch>

          <Divider color="light" />
          <Footer
            color="white"
            size="medium"
            logo="https://uploads.divjoy.com/logo.svg"
            description="A short description of what you do here"
            copyright="© Company Name"
          />
        </>
      </Router>
    </ProvideAuth>
  );
}

export default App;
