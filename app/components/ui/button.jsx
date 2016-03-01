import React from 'react';
import classNames from 'classnames';

Button.propTypes = {
  state: React.PropTypes.bool,
  text: React.PropTypes.array,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
};

Button.defaultProps = {
  state: false,
  className: ''
};

export default function Button(props) {

  let {children, state, text, className, onClick} = props;

  let classes = classNames({
    button: true,
    active: state
  }) + ' ' + className;

  let stateText = state ? text[1] : text[0];

  return (
    <a className={classes} onClick={onClick}>
      {props.text ? stateText : children}
    </a>
  );
}
