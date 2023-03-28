import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { ProductsContext } from '../../../providers/ProductsContext';

const CartProductList = () => {
  const { cartList, removeAllProductsCart, cartTotal } =
    useContext(ProductsContext);

  return (
    <StyledCartProductList>
      <ul>
        {cartList.map((product) => (
          <CartProductCard product={product} key={product.id} />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>R$ {cartTotal()}</StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={removeAllProductsCart}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
