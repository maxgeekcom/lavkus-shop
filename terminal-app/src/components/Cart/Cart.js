import "./Cart.css"
import React from "react"
import totalLine from "../../img/total-line.svg"


function Cart(props) {
  return (
    <div className="cart card">
      <div className="itemsHeader header">Товары</div>

      <div className="itemsTable">
        <table>
          <thead>
            <tr>
              <th className="itemName" id="itemNameHeader">Название</th>
              <th className="itemsNumber" id="itemsNumberHeader">Кол.</th>
              <th className="priceItems" id="priceItemsHeader">Цена</th>
            </tr>
          </thead>
        </table>
        <div className="itemsTableBody">
          <table>
            <tbody>
              {props.itemsInfo.map((value, index) => {
                return (<tr key={index}>
                  <td className="itemName">{value.name}</td>
                  <td className="itemsNumber">{"x" + value.number}</td>
                  <td className="priceItems">{value.price + ' ₽'}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>

      <img className="totalLine" src={totalLine}  alt=""/>
      <div className="totalPrice">
        <span className="header">К оплате:</span> {String(props.totalPrice) + " ₽"}
      </div>

      <div className="cartController">
        <button className="cleanCartButton" onClick={props.cleanCartHandler}>Очистить</button>
        <button className="payButton" onClick={props.payHandler}>Оплатить</button>
      </div>
    </div>
  );
}

export default Cart
