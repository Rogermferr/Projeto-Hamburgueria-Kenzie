import { useContext } from 'react';
import { SearchResultsStyle } from './style';
import { ProductsContext } from '../../providers/ProductsContext';

export const SearchResults = () => {
  const { search, setSearch } = useContext(ProductsContext);

  return (
    <SearchResultsStyle>
      <h2>Resultados de busca para: {search.search}</h2>
      <button type='button' onClick={() => setSearch({ search: '' })}>
        Limpar busca
      </button>
    </SearchResultsStyle>
  );
};
