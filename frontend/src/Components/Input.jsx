import { twMerge } from "tailwind-merge"

function Input ({leftIcon, rightIcon, className, ...rest}){

    return (

        <div className="flex items-center relative">
            
            <input {...rest} className={twMerge("p-1 absolute w-full h-full rounded-lg border-[0.125rem] border-solid outline-none focus:ring-1", className)}/>
            <div className="absolute px-[0.3rem] left-0">{leftIcon}</div>
            <div className="absolute px-[0.3rem] right-0">{rightIcon}</div>

        </div>

    )

}

export default Input