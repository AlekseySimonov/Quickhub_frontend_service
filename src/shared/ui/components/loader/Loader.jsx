import { TailSpin } from "react-loader-spinner"

export const Loader = ({style})=>{
    return(
        <TailSpin
            visible={true}
            height="100"
            width="100"
            color="rgb(65, 95, 243)"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass={style}
    />)
}