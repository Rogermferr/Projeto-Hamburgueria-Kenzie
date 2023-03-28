import { Link } from 'react-router-dom';
import { NotFoundStyle } from './style';

export const NotFound = () => (
  <NotFoundStyle>
    <h1>Error: 404</h1>
    <h2>Página não encontrada :(</h2>
    <Link to='/'>Retorne a página inicial</Link>
  </NotFoundStyle>
);
