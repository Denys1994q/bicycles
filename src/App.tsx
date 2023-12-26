import './App.sass'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AdminPanel from './screens/admin-panel/AdminPanel';

function App() {
    return (
        <section className='main-container'>
            <Header />
                <AdminPanel />
            <Footer firstName='Denys' lastName='Rybachok' />
        </section>
    )
}

export default App;
