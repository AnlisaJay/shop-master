import React, { Component } from 'react';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { key: 'all', name: 'Всё' },
        { key: 'green', name: 'Зелёный' },
        { key: 'black', name: 'Чёрный' },
        { key: 'herbal', name: 'Травянной' },
        { key: 'Gift', name: 'Подарочный' },
      ],
    };
  }

  render() {
    return (
      <div className='categories'>
        {this.state.categories.map((el) => (
          <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>
            {el.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
