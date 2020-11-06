import styled from 'styled-components';

export const TableRowContainer = styled.tr`
  td {
    font-size: 0.9rem;
    img {
      height: 100px;
      width: 100px;
      object-fit:cover;
    }
    button {
      font-size: 0.75rem;
      color: #3267A1;
      background-color: transparent;
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 4px;
      padding: 0 3px;
      transition: color 0.5s, background-color 0.5s;

      &:hover {
        background-color: #777;
        color: #fff;
      }
    }
  }

  .productName {
    min-width: 250px;
  }

  .productDescription {
    min-width: 300px;
  }
`;