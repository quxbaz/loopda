import React from 'react'
import {PureComponent} from 'loopda/lib/react-ext'

class Nav extends PureComponent {
  render() {
    return (
      <ul className="nav">
        <li>
          <a href='/#/dashboard'>
            <span className="logo-text">Loopda</span>
          </a>
        </li>
        <li><a href='/#/dashboard'>Dashboard</a></li>
        <li><a href='/#/presets'>Presets</a></li>

        {/*
          ... about
          ... github
          ... donating
          ... contact
          ... bugs
        */}

      </ul>
    )
  }
}

export default Nav
