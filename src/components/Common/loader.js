import React from 'react'
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners'


const Loader = (props) => {
  const override = css`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
  const { loading } = props
  return (
    <ScaleLoader loading={ loading } css={override} sizeUnit={"px"} size={120} color={'#22575A'}/>
  )
}

export default Loader


export const Loader2 = (props) => {
  const override = css`margin:10px auto; width:45px;`;
  const { loading } = props
  return (
    <ScaleLoader loading={ loading } css={override} sizeUnit={"px"} size={120} color={'#22575A'}/>
  )
}