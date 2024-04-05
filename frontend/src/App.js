import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [], // Каждый элемент массива будет содержать объект {item: товар, quantity: количество}
      currentItems: [],
      showFullItem: false,
      fullItem: {}
    };
    
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
  }
  
  
  componentDidMount() {
    this.fetchProducts(); // Получаем продукты с сервера после монтирования компонента
  }

  fetchProducts() {
    // Выполняем запрос к серверу Express для получения списка продуктов
    fetch("http://localhost:9001/products")
      .then(response => response.json())
      .then(data => {
        this.setState({ currentItems: data.data }); // Устанавливаем полученные продукты в состояние
      })
      .catch(error => {
        console.error("Ошибка при получении продуктов:", error);
      });
  }

  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <Categories chooseCategory={(category) => this.chooseCategory(category)} />

        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems} // Передаем текущие продукты в компонент Items
          onAdd={this.addToOrder}
        />
        {this.state.showFullItem && (
          <ShowFullItem
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
            item={this.state.fullItem}
          />
        )}
        <Footer />
      </div>
    );
  }

  onShowItem(item) {
    this.setState({
      fullItem: item,
      showFullItem: !this.state.showFullItem
    });
  }

  chooseCategory(category) {
    // Фильтруем текущие продукты по выбранной категории
    const filteredItems = this.state.currentItems.filter(item => item.category === category);
    
    // Устанавливаем выбранную категорию и отфильтрованные продукты в состояние
    this.setState({
      selectedCategory: category,
      filteredItems: filteredItems
    });
  }
  deleteOrder(index) {
    // Создаем копию массива заказов и удаляем товар по указанному индексу
    const updatedOrders = [...this.state.orders];
    updatedOrders.splice(index, 1);
    // Обновляем состояние orders
    this.setState({ orders: updatedOrders });
  }
  
  
  addToOrder(item) {
    // Создаем новый массив заказов, добавляя в него новый товар
    const updatedOrders = [...this.state.orders, item];
    // Обновляем состояние orders
    this.setState({ orders: updatedOrders });
  }
}

export default App;
