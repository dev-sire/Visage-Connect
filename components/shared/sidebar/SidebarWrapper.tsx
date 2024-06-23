import React from 'react'
import DesktopNav from './nav/DesktopNav'
import MobileNav from './nav/MobileNav'

type Props = React.PropsWithChildren<{}>

const sidebarWrapper = ({ children }: Props) => {
  return (
    <div className='h-full w-full p-4 flex flex-col lg:flex-row gap-4'>
      <MobileNav />
      <DesktopNav />
      <main className='flex h-[calc(100% - 80px)] lg:h-full w-full gap-4'>
        {children}
      </main>
    </div>
  )
}

export default sidebarWrapper