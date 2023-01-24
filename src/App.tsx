import UserList from './components/ListUser'
import Card from '@mui/material/Card';



function App() {

  return (
    
        <div className="App">
           <Card sx={{ minWidth: 275 , maxWidth: '70%', margin: '0 auto'}}>             
              <UserList />
           </Card>
        </div>    
  
  )
}

export default App
