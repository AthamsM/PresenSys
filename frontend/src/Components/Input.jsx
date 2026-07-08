import { twMerge } from "tailwind-merge"

function Input (props){

    return (

        <div>
            <input {...props} className={twMerge("p-1 rounded-md border-[0.125rem] border-solid outline-none focus:ring-1", props.className)}/>
        </div>

    )

}

export default Input