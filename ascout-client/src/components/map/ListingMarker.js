import React, { useEffect, useState } from 'react'
import { Arrow, useLayer } from 'react-laag'
import styled from 'styled-components'
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
  padding: 0.8em;
  font-size: 10pt;
  display: block;
  width: 200px;
  word-wrap: break-word;
`

export default function ListingMarker({ key, listing, open, close }) {
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

  useEffect(() => {
    if (open) setOpen(true)
  }, [open])

  useEffect(() => {
    if (close) setOpen(false)
  }, [close])

  return (
    <div key={key}>
      {isShown && (
        <StyledMarker
          key={key}
          onClick={() => setOpen((prev) => !prev)}
          {...triggerProps}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        />
      )}
      {isOpen &&
        renderLayer(
          <InfoBox key={key} {...layerProps}>
            <img
              src={listing.pictureUrl}
              width='200'
              height='150'
              alt={listing.name}
            />
            <br />
            <InfoDetail>
              {listing.name}
              <br />
              <span style={{ float: 'right', paddingBottom: '0.5em' }}>
                {listing.price} CHF
              </span>
            </InfoDetail>
            <Arrow {...arrowProps} />
          </InfoBox>
        )}
    </div>
  )
}
