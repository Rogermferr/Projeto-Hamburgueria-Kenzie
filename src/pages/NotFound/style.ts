import styled from 'styled-components';

export const NotFoundStyle = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  text-align: center;

  h1 {
    font-size: 5rem;
    color: #27ae60;
  }

  a {
    padding: 8px 16px;
    background-color: #27ae60;

    border-radius: 4px;

    color: #fff;
    font-size: 1rem;
    font-weight: bold;
  }
`;
