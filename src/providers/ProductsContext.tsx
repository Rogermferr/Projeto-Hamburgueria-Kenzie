import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { iSearchValue } from '../components/Header/SearchForm';
import { api } from '../services/api';

export interface iProduct {
  id: number;
  name: string;
  img: string;
  price: number;
  category: string;
  amount: number;
}

interface iProductsContext {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartList: iProduct[];
  setCartList: React.Dispatch<React.SetStateAction<iProduct[]>>;
  addProductCart: (productId: number) => void;
  removeProductCart: (productId: number) => void;
  removeAllProductsCart: () => void;
  cartTotal: () => string;
  search: iSearchValue;
  setSearch: React.Dispatch<React.SetStateAction<iSearchValue>>;
  filterProducts: iProduct[];
}

interface iProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsContext = createContext({} as iProductsContext);

export const ProductsProvider = ({ children }: iProductsProviderProps) => {
  const saveCart = localStorage.getItem('@KENZIEBURGUERV2:CART');

  const [productsList, setProductsList] = useState<iProduct[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState<iProduct[]>(
    saveCart ? JSON.parse(saveCart) : []
  );
  const [search, setSearch] = useState<iSearchValue>({ search: '' });

  const token = localStorage.getItem('@KENZIEBURGUERV2:USERTOKEN');

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const response = await api.get<iProduct[]>('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProductsList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductsList();
  }, []);

  const addProductCart = (productId: number) => {
    const productFound = productsList.find(
      (product) => productId === product.id && product
    ) as iProduct;

    const newProductFound = { ...productFound, amount: 1 } as iProduct;

    const someProduct = cartList.some((product) => product.id === productId);

    if (someProduct) {
      toast.error('Produto já existe no carrinho');
    } else {
      setCartList([...cartList, newProductFound as iProduct]);

      toast.success('Produto adicionado ao carrinho');
    }
  };

  const removeProductCart = (productId: number) => {
    const productsCartFiltered = cartList.filter(
      (product) => product.id !== productId && product
    );

    toast.success('Produto removido do carrinho');
    setCartList(productsCartFiltered);
  };

  const removeAllProductsCart = () => {
    setCartList([]);
    toast.success('Todos os produtos foram removidos do carrinho');
  };

  useEffect(() => {
    localStorage.setItem('@KENZIEBURGUERV2:CART', JSON.stringify(cartList));
  }, [cartList]);

  const cartTotal = () => {
    const total = cartList
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      )
      .toFixed(2);

    return total;
  };

  const filterProducts = productsList.filter((product) =>
    search.search === ''
      ? true
      : product.name.toLowerCase().includes(search.search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.search.toLowerCase())
  );

  return (
    <ProductsContext.Provider
      value={{
        showCart,
        setShowCart,
        cartList,
        setCartList,
        addProductCart,
        removeProductCart,
        removeAllProductsCart,
        cartTotal,
        search,
        setSearch,
        filterProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
