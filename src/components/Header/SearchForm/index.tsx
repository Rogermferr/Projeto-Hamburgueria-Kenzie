import { MdSearch } from 'react-icons/md';
import { Field, FieldValue, FieldValues, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { ProductsContext } from '../../../providers/ProductsContext';

export interface iSearchValue {
  search: string;
}

const SearchForm = () => {
  const { register, handleSubmit } = useForm<iSearchValue>();

  const { setSearch } = useContext(ProductsContext);

  const searchSubmit = (data: iSearchValue) => {
    setSearch(data);
  };

  return (
    <StyledSearchForm onSubmit={handleSubmit(searchSubmit)}>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        {...register('search')}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
