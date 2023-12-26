import './App.sass'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './screens/home/Home';

function App() {
    return (
        <section className='main-container'>
            <Header />
                <Home />
            <Footer firstName='Denys' lastName='Rybachok' />
        </section>
    )
}

export default App;
