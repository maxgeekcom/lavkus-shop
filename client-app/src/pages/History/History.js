import "./History.css"
import React from "react"
import CloseButton from "../../components/BackButton/CloseButton"

function HistoryTable() {
  return (
    <table className="purchaseList">
      <tr>
        <th className="purchaseListColumnName" id="productNames">Продукт</th>
        <th className="purchaseListColumnName" id="productPrices">Цена</th>
      </tr>
    </table>
  )
}

function HistoryCard() {
  return (
    <div className="historyCard card">
      <div className="header">
        История покупок
      </div>
      <div className="historyTable">
        Пусто
      </div>
    </div>
  )
}

function History() {

  return (
    <div className="history">
      <HistoryCard/>
      <CloseButton/>
    </div>
  )

}

export default History
