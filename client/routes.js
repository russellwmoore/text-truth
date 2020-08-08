import React, {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import {Text} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route component={Text} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes

/**
 * PROP TYPES
 */
