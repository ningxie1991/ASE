import React, { useState } from 'react'
import styled from 'styled-components'
import { useLayer, useHover, Arrow } from 'react-laag'
import HomeIcon from '@material-ui/icons/Home';
import './AttractionMarker.css'

const StyledMarker = styled.div`
  position: absolute;
  width: 38px;
  height: 37px;
  background-image: url(https://img.icons8.com/flat-round/50/000000/home--v1.png);
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:hover {
    z-index: 1;
  }
`
const InfoBox = styled.div`
  padding: 0;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  &:hover {
    z-index: 1;
  }
`

const InfoDetail = styled.span`
  padding: 1em;
  font-size: 10pt;
`

export default function ListingMarker({ key, listing }) {
  const [isShown, setShown] = useState(true)
  const [isOpen, setOpen] = useState(false)

  // specify the appended div id on the container option
  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen,
    placement: 'bottom-center',
    triggerOffset: 8,
    onOutsideClick: () => setOpen(false),
    onDisappear: (type) => {
      if (type === 'full') setOpen(false)
    },
  })

  return (
    <div key={key}>
      {isShown && (
        <StyledMarker
          key={key}
          onClick={() => setOpen((prev) => !prev)}
          {...triggerProps}
        />
      )}
      {isOpen &&
        renderLayer(
          <InfoBox key={key} {...layerProps}>
            <img src={listing.picture_url} width="200" height="150" />
            <br />
            <InfoDetail>{listing.name}</InfoDetail>
            <br />
            <InfoDetail style={{float: 'right'}}>{listing.price} CHF</InfoDetail>
            <Arrow {...arrowProps} />
          </InfoBox>
        )}
    </div>
  )
}
