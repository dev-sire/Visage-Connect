import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper"

type Props = React.PropsWithChildren<{}>

const layout = ({ children }: Props) => {
  return (
    <SidebarWrapper>{children}</SidebarWrapper>
  )
}

export default layout