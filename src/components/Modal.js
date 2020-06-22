import React from 'react'
import styled from 'styled-components'
import ClientPortal from './ClientPortal'
import { transitions } from '../styled/mixins'

const Backdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 13;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
`

const Box = styled.div`
  ${transitions}
  top: 5%;
  right: 5%;
  bottom: 5%;
  left: 5%;
  ${(p) => p.withImage && 'padding: 0.8em;'}
  padding-top: 0px;
  position: absolute;
  border-radius: 15px;
  background-color: white;
  @media screen and (min-width: 568px) {
    top: 10%;
    right: 10%;
    bottom: 10%;
    left: 10%;
  }
  @media (min-width: 991px) {
    top: 20%;
    right: 30%;
    bottom: 20%;
    left: 30%;
  }
`

const CloseButton = styled.span`
  z-index: 12;
  float: right;
  cursor: pointer;
  font-size: 24px;
  color: lightgray;
  font-weight: bold;
  position: relative;
  ${(p) => p.withImage && 'padding-right: 0.5em;'}
  &:hover{
    color: darkgray;
  }
`

const BoxWithImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
`

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: none;
  border-radius: 13px 0px 0px 13px;
  background-color: #0085ff;
  @media screen and (min-width: 768px) {
    display: block;
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 13px 0px 0px 13px;
`

const RigthContent = styled.div`
  width: 100%;
  display: flex;
  overflow: auto;
  position: relative;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`

const BoxContent = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  max-height: calc(100% - 40px);
`

const Modal = ({ isOpen, close, lateralImage = '', children }) => {
  if (!isOpen) return null
  return (
    <ClientPortal selector="#modal">
      <Backdrop>
        <Box withImage={!lateralImage}>
          <CloseButton onClick={close} withImage={!!lateralImage}>&times;</CloseButton>
          {
            lateralImage ?
              <BoxWithImage>
                <ImageContainer>
                  <Image src={lateralImage} />
                </ImageContainer>
                <RigthContent>
                  {children}
                </RigthContent>
              </BoxWithImage> :
              <BoxContent>
                {children}
              </BoxContent>
          }
        </Box>
      </Backdrop>
    </ClientPortal>
  )
}

export default Modal
