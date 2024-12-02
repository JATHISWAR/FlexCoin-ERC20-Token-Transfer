import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Wallet from './Wallet'; // Import the new component




import React from "react";

class App extends React.Component {


  render() {


    return(
      <Router>
      <div>
        <Routes>
        <Route path="/" element={<Wallet/>} />
          </Routes>
      </div>
    </Router>
    );
  }
}
export default App;
