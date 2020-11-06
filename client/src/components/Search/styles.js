import styled from 'styled-components';

export const SearchContainer = styled.form`
  display: flex;

  div + div {
    margin-left: 30px;
  }

  .productName {
    input {
      min-width: 230px;
    }
  }

  .numberOfResults {
    width: auto;
    input {
      max-width: 70px;
      padding-left: 10px; 
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 5px 0 0 5px;
    }
  }

  .colorOptions {
      min-width: 130px;
  }

  button {
    margin-left: 30px;
  }
`;