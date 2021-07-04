import "./App.css"
import React, {useState, useRef, useEffect} from "react"
import Logo from "./components/Logo/Logo"
import Mirror from "./components/Mirror/Mirror"
import Cart from "./components/Cart/Cart"
import TerminalNotification from "./components/TerminalNotification/TerminalNotification"
import useHttp from "./hooks/http.hook"
import useFaceDet from "./hooks/faceDet.hook"
import useScanner from "./hooks/scanner.hook"
import useUserPic from "./hooks/userPic.hook"


const SHOP_NAME = 'lavkus'

function App() {
  const userPicCanvasTagRef = useRef(null)
  const videoTag = useRef(null)
  const {request} = useHttp()
  const {faceDetection, loadFaceRecognitionNet} = useFaceDet()
  const {createUserPic} = useUserPic()
  const {qrResult, clearQrResult} = useScanner(videoTag)
  const [customerName, setCustomerName] = useState('Неизвестно')
  const [itemsInfo, setItemsInfo] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [notification, setNotification] = useState({message: {text: 'Отсканируйте товар'}})
  const [failureCounter, setFailureCounter] = useState(0)


  useEffect(() => {
    loadFaceRecognitionNet()
  }, [])


  const getItemInfo = async (id) => {
    try {
      const data = await request('/api/product', 'POST', {id: id})
      const productInfo = data.productInfo
      productInfo.number = 1

      setItemsInfo(oldItemsList => [...oldItemsList, productInfo])
      setTotalPrice(prevTotalPrice => prevTotalPrice + productInfo.price)
    } catch (e) {}
  }

  useEffect(() => {

    if (qrResult) {
      const product = JSON.parse(qrResult)

      if (product.shop === SHOP_NAME && Number.isInteger(product.id)) {
        const itemInCart = itemsInfo.find(item => {
          if (item.id === product.id){
            return true
          }
        })

        if (itemInCart) {
          setNotification({dialog: {item: itemInCart}})
        } else {
          getItemInfo(product.id)
        }
      }

      setTimeout(() => {
        clearQrResult()
      }, 3000)
    }

  }, [qrResult])


  const clearNotification = () => {
    setTimeout(() => {
      return setNotification({message: {text: 'Отсканируйте товар'}})
    }, 3000)
  }

  const cleanCart = () => {
    setItemsInfo([])
    setTotalPrice(0)
  }

  const payHandler = async () => {
    try {

      if (itemsInfo.length === 0) {
        setNotification({message: {status: 'failure', text: 'Корзина пуста. Оплата невозможна'}})
        return clearNotification()
      }

      setNotification({message: {text: 'Идет оплата. Пожалуйста, подождите...'}})
      const isFace = await faceDetection(videoTag)

      if (isFace) {
        const codeFaceFormData = new FormData()
        const paymentFormData = new FormData()

        const blobUserPic = await createUserPic(videoTag, userPicCanvasTagRef)

        codeFaceFormData.append('facePic', blobUserPic, 'facePic.png')
        const userFaceCode = await request('/api/recognition', 'POST', codeFaceFormData)
        const faceCode = JSON.parse('[' + userFaceCode.code + ']')

        paymentFormData.append('faceCode', faceCode)
        paymentFormData.append('itemsInfo', JSON.stringify(itemsInfo))
        const paymentResponse = await request('/api/pay', 'POST', paymentFormData)

        if (paymentResponse.type === 'face' && failureCounter < 4) {
          setNotification({message: {status: 'Failure', text: 'Оплата не удалась. Попробуйте снова'}})
          setFailureCounter(prevFailureNumber => prevFailureNumber + 1)
          return clearNotification()
        }
        if (failureCounter === 4) {
          setNotification({message: {status: 'failure', text: 'Возможно вы не зарегистрированы'}})
          setFailureCounter(0)
          return clearNotification()
        }

        if (paymentResponse.type === 'balance')
        {
          setNotification({message: {status: paymentResponse.status, text: paymentResponse.message}})
          return clearNotification()
        }

        setNotification({message: {status: 'success', text: paymentResponse.message}})
        
        cleanCart()

        return clearNotification()
      }

      if (!isFace) {
         setNotification({message: {status: 'failure', text: 'Для оплаты необходимо Ваше лицо.'}})
        return clearNotification()
      }
    } catch (e) {}
  }

  return (
    <div className="app">
      <Logo/>
      <TerminalNotification
        notification={notification}
        setItemsInfo={setItemsInfo}
        setTotalPrice={setTotalPrice}
        setNotification={setNotification}
      />
      <Mirror
        videoTag={videoTag}
      />
      <Cart
        customerName={customerName}
        itemsInfo={itemsInfo}
        totalPrice={totalPrice}
        cleanCartHandler={cleanCart}
        payHandler={payHandler}
      />
      <canvas ref={userPicCanvasTagRef} style={{display:"none"}}/>
    </div>
  )
}

export default App
