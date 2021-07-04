import "./Home.css"
import React from "react"
import paymentPresentationPic from "../../img/payment-presetation-pic.svg"


function DescriptionShopCard() {
  return (
    <div className="descriptionShopCard card">
      <div className="descriptionShop">
        <span className="highlighter">ЛАВКУС</span> - сеть мини-магазинов с использованием самых передовых технологий.
      </div>
    </div>
  )
}


function DescriptionPaymentCard() {
  return (
    <div className="descriptionPaymentCard card">
      <div className="slogan">
        ТВОЁ ЛИЦО - <span className="highlighter">ТВОЙ КОШЕЛЁК</span>
      </div>
      <img className="paymentPresentation" src={paymentPresentationPic} alt="paymentPresentationPic"/>
    </div>
  )
}


function Home() {
  return (
    <div className="home">
      <DescriptionShopCard/>
      <DescriptionPaymentCard/>
    </div>
  )
}

export default Home
