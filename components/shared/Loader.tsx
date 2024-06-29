import Image from "next/image"

type Props = {
    size?: number
}

const Loader = ({ size = 200 }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
        <Image src="/auth-logo.svg" width={size} height={size} alt="loader-logo" className="animate-pulse duration-800" />
        {/* <div className="loader"></div> */}
    </div>
  )
}

export default Loader