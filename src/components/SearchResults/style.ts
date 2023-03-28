import styled from 'styled-components';

export const SearchResultsStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 16px;

  button {
    padding: 8px 16px;
    background-color: #27ae60;

    border: none;
    border-radius: 4px;

    color: #fff;
    font-size: 1rem;
    font-weight: bold;

    transition: all 0.5s;

    :hover {
      filter: brightness(1.2);
    }
  }
`;
