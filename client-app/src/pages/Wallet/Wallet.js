import "./Wallet.css"
import React, {useState, useEffect, useContext} from "react"
import useHttp from "../../hooks/http.hook"
import AuthContext from "../../context/AuthContext"
import Notification from "../../components/Notification/Notification"
import CloseButton from "../../components/BackButton/CloseButton"
import Error from "../../components/Error/Error"
import decreaseCreditPic from "../../img/decrease-credit-pic.svg"
import increaseCreditPic from "../../img/increase-credit-pic.svg"
import Loading from "../../components/Loading/Loading"


function WalletCard(props) {
  const [intervalID, setIntervalID] = useState(null)

  const MIN_CREDIT = 0
  const MAX_CREDIT = 1000

  const minusPointerDownHandler = () => {
    setIntervalID(setInterval(() => {
      props.setCredit((prev) => {
        return prev - 1
      })
    }, 50))
  }

  const plusPointerDownHandler = () => {
    setIntervalID(setInterval(() => {
      props.setCredit((prev) => {
        return prev + 1
      })
    }, 50))
  }

  const pointerUpHandler = () => {
    clearInterval(intervalID)
    setIntervalID(null)
  }

  useEffect(() => {
    if (props.credit < MIN_CREDIT) {
      props.setCredit(MIN_CREDIT)
    }

    if (props.credit > MAX_CREDIT) {
      props.setCredit(MAX_CREDIT)
    }
  }, [props.credit])

  return (
    <div>
      <div className="walletCard card">

        <div className="walletHeader header">
          Кошелёк
        </div>

        <div className="subheaderWallet header">
          Остаток на счёте:
        </div>

        <div className="currentBalanceField">
          {props.balance + " ₽"}
        </div>

        <div className="credit">
          <button
            className="creditButton"
            id="decreaseCreditButton"
            onPointerDown={minusPointerDownHandler}
            onPointerUp={pointerUpHandler}
            onPointerLeave={pointerUpHandler}
          >
            <img src={decreaseCreditPic} alt="minus"/>
          </button>
          <input
            className="creditField"
            name="credit"
            value={props.credit} readOnly/>
          <button
            className="creditButton"
            id="increaseCreditButton"
            onPointerDown={plusPointerDownHandler}
            onPointerUp={pointerUpHandler}
            onPointerLeave={pointerUpHandler}
          >
            <img src={increaseCreditPic} alt="plus"/>
          </button>
        </div>

        <button
          className="refillButton"
          onClick={props.refillHandler}
        >
          Пополнить
        </button>
      </div>
    </div>
  )
}


function Wallet() {
  const {request, error, clearError,loading} = useHttp()
  const auth = useContext(AuthContext)
  const [response, setResponse] = useState(null)
  const [balance, setBalance] = useState(0)
  const [credit, setCredit] = useState(100)


  useEffect(() => {
    const getBalance = async () => {
      const data = await request('/api/user/wallet', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setBalance(data.balance)
    }
    getBalance()
  }, [])

  const refillHandler = async () => {
    try {
      const newBalance = balance + credit
      const data = await request('/api/user/wallet', 'POST', {newBalance: newBalance}, {
        Authorization: `Bearer ${auth.token}`
      })

      setResponse(data)
      setBalance(newBalance)
    } catch (e) {}
  }

  const notificationHandler = () => {
    setResponse(null)
  }

  const errorHandler = () => {
    clearError();
  }

  if (response) {
    return <Notification message={response.message} onClick={notificationHandler}/>
  }

  if (error) {
    return <Error message={error} onClick={errorHandler}/>
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="wallet">
      <WalletCard
        balance={balance}
        setBalance={setBalance}
        credit={credit}
        setCredit={setCredit}
        refillHandler={refillHandler}
      />
      <CloseButton/>
    </div>
  )
}

export default Wallet
