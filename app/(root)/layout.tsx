import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper"
import Image from "next/image"

type Props = React.PropsWithChildren<{}>

const layout = ({ children }: Props) => {
  return (
      <SidebarWrapper>{children}</SidebarWrapper>
  )
}

export default layout