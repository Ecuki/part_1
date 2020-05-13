import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  z-index: 99;
  background-color:#1B1C1D;

  div {
    width: 100%;
    text-align: center;
    color: white;
  }
  a {
    color: white;
    transition: color 0.1s ease;
  }
  a:hover {
    color: #ddd;
  }
`

function Footer() {
  return (
    <StyledFooter>
      <div>Full stack course exercise by Emil Jeziorski</div>
      <div>
        <a href="https://github.com/Ecuki/part_1/tree/part_7" target="_blanck">
          GitHub <Icon name="github" />
        </a>
      </div>
    </StyledFooter>
  )
}
export default Footer
