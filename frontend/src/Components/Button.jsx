import { twMerge } from "tailwind-merge"

function Button(props){

    return (
        
        <button {...props} className={twMerge("p-2", props.className)}>
            {props.children}
        </button>

    );
}

export default Button;