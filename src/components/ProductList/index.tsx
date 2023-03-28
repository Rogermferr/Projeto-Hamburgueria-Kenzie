import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { ProductsContext } from '../../providers/ProductsContext';

const ProductList = () => {
  const { filterProducts } = useContext(ProductsContext);

  return (
    <StyledProductList>
      {filterProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
