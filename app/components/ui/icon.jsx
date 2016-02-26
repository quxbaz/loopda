import React from 'react';
import classNames from 'classnames';

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  classes: React.PropTypes.object
};

Icon.defaultProps = {
  classes: {}
};

export default function Icon(props) {
  let {name, classes} = props;
  let className = classNames(Object.assign({icon: true}, classes));
  // JSX does not support xlink:href, so we need raw HTML.
  return (
    <span className={className}>
      <svg  dangerouslySetInnerHTML={{
        __html: `<use xlink:href="icons/sprite.svg#${name}"></use>`
      }}/>
    </span>
  );
};
