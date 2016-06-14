import React, {PropTypes} from 'react'
import {PureComponent} from 'loopda/lib/react-ext'
import Block from '../providers/Block'

class BlockList extends PureComponent {
  render() {
    const {Child, ids, selected, onClickBlock} = this.props
    const Item = Child ? Child : Block
    return (
      <div className="block-list">
        {ids.map((id, i) => (
          <Item key={id} id={id} i={i} selected={id === selected}
            onClick={onClickBlock} />
        ))}
      </div>
    )
  }
}

BlockList.propTypes = {
  Child: PropTypes.func,
  ids: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onClickBlock: PropTypes.func,
}

export default BlockList
