import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Avatar} from "@material-ui/core";

const Wrapper = styled.div`
  position: absolute;
  width: 38px;
  height: 37px;
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: grab;
`

const Marker = ({ pictureUrl, lat, lng, text }) => <Wrapper alt={text} >
  <Avatar src={pictureUrl} />
</Wrapper>

Marker.defaultProps = {
  onClick: null,
}

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}

export default Marker
