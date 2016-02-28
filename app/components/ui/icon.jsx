import React from 'react';
import classNames from 'classnames';

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func
};

Icon.defaultProps = {
  className: ''
};

export default function Icon(props) {
  let {name, onClick} = props;
  let className = classNames({
    icon: true,
    clicky: props.onClick
  }) + ' ' + props.className;
  // JSX does not support xlink:href, so we need raw HTML.
  return (
    <span className={className} onClick={onClick}>
      <svg  dangerouslySetInnerHTML={{
        __html: `<use xlink:href="icons/sprite.svg#${name}"></use>`
      }}/>
    </span>
  );
};
