import './App.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { RoomBooking } from './components/RoomBooking'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RoomBooking/>
      </div>
    </Provider>
  )
}

export default App
