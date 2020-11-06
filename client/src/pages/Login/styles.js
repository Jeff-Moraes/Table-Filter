import styled from 'styled-components';

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background-color: #fdfdfd;
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  width: 100%;
  max-width: 700px;

  form {
    width: 300px;
    margin-top: 80px;
    text-align: center;

    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-bottom: 24px;
  }

  .errorMessage {
    margin-top: 7px;
    color: #e8505b;
    font-weight: 400;
    font-size: 12px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url("https://res.cloudinary.com/jeffmoraes/image/upload/c_scale,w_1400/v1604584949/projects/gdtography-LCJ9iOli-uE-unsplash_e8dnwz.jpg")
    no-repeat center;
  background-size: cover;
`;