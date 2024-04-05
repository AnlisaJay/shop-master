import React, { Component } from 'react'
import { FaTrash } from 'react-icons/fa'

export class Order extends Component {
  render() {
    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.img} alt={this.props.item.title} />
        <h2>{this.props.item.title}</h2>
        <b>{this.props.item.price}p</b>
        <FaTrash className='delete-icon' onClick={() => this.props.onDelete(this.props.index)} />
      </div>
    )
  }
}

export default Order