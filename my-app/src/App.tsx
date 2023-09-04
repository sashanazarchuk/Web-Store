import './App.css';
import { Route, Routes } from 'react-router';
import ProductList from './components/ProductList';
import DefaultHeader from './components/Default/DefaultHeader';
import Cart from './components/Cart';
import DefaultFooter from './components/Default/DefaultFooter';
import NoMatch from './components/noMatch';


function App() {
  return (
    <>
      <DefaultHeader />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <DefaultFooter />

    </>
  );
}

export default App;
