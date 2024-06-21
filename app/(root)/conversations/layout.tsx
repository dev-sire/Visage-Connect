import React from 'react'

type Props = React.PropsWithChildren<{}>

const Conversaionslayout = ({ children }: Props) => {
  return (
    <div>{children}</div>
  )
}

export default Conversaionslayout