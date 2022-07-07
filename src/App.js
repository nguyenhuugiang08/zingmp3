import './App.css';
import Header from './components/Header/Index';
import Navbar from './components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import PlaySong from 'components/PlaySong/PlaySong';
import Routerall from 'routers';
library.add(fas, far)

function App() {

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routerall/>
      <PlaySong />
    </div>
  );
}

export default App;
