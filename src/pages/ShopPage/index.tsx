import { useContext } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { ProductsContext } from '../../providers/ProductsContext';
import { SearchResults } from '../../components/SearchResults';

const ShopPage = () => {
  const { showCart, search } = useContext(ProductsContext);

  return (
    <StyledShopPage>
      {showCart && <CartModal />}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          {search.search !== '' && <SearchResults />}
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
