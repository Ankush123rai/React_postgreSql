import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Sidebar';
import { store } from '@/store/store';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from './components/layout/Header';
import { StudentsTable } from './pages/students/StudentsTable';

function App() {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <Router>
          <Layout>
        <Header />
            <Routes>
              <Route path="/" element={<StudentsTable/>} />
            </Routes>
          </Layout>
        </Router>
      </SidebarProvider>
    </Provider>
  );
}

export default App;
