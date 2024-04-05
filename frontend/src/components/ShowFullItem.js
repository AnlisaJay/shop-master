import React, { Component } from 'react'

export class ShowFullItem extends Component {
  render() {
    return (
      <div className='full-item'>
         <div>
            <img src={"./img/" + this.props.item.img} alt={this.props.item.title} onClick={() => this.props.onShowItem(this.props.item)} />
            <h2>{this.props.item.title}</h2>
            <p>{this.props.item.desc}</p>
            <b>{this.props.item.price}p</b>
            <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>+</div>
         </div>
     </div>
    )
  }
}

export default ShowFullItem