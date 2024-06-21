import Image from "next/image"

type Props = {
    size?: number
}

const Loader = ({ size = 100 }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
        <Image src="/logo.svg" width={size} height={size} alt="loader-logo" className="animate-pulse duration-800" />
    </div>
  )
}

export default Loader