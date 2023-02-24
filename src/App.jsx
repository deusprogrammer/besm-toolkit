import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Characters from './routes/Characters';
import Enemies from './routes/Enemies';
import Home from './routes/Home';
import InitiativeTracker from './routes/InitiativeTracker';

import './App.css';
import Items from './routes/Items';

let App = () => {
    return (
        <div>
            <Router>
                <h1>BESM Tool</h1>
                <header>
                    <Link to='/'>Home</Link>
                    <Link to='/characters'>Characters</Link>
                    <Link to='/enemies'>Enemies</Link>
                    <Link to='/items'>Items</Link>
                    <Link to='/initiative'>Initiative Tracker</Link>
                </header>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/characters' element={<Characters />} />
                    <Route exact path='/enemies' element={<Enemies />} />
                    <Route exact path='/items' element={<Items />} />
                    <Route exact path='/initiative' element={<InitiativeTracker />} />
                </Routes>
            </Router>
        </div>
    )    
}

export default App;
