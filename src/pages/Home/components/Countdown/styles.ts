import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  display: flex;
  gap: 1rem;
  font-size: 10rem;
  line-height: 8rem;

  color: ${(props) => props.theme['gray-100']};

  span {
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 0 2rem;
  color: ${(props) => props.theme['gray-100']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
