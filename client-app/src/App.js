import './App.css'
import {BrowserRouter as Router} from "react-router-dom"
import useRoutes from "./routes"
import useAuth from "./hooks/auth.hook"
import AuthContext from "./context/AuthContext"
import Navigator from "./components/Navigator/Navigator"


function App() {
  const {token, userID, login, logout} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <div className="app">
      <AuthContext.Provider value={{
        token, userID, login, logout, isAuthenticated
      }}>
        <Router>
          <Navigator/>
          { routes }
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
