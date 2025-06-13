import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Footer from './components/Footer/footer';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <main style={{ flex: 1 }}>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
