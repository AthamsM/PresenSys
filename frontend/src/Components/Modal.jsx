import { twMerge } from "tailwind-merge"

function Modal (props){

    if (props.open)
    return (

        <div onClick={() => (props.setOpen(false))} className="bg-[#263238]/40 fixed top-0 bottom-0 left-0 right-0 z-100 flex justify-center items-center">
            
            <div onClick={(e) => e.stopPropagation()} className={twMerge("p-[1rem] bg-[#F9FBFC] rounded-lg shadow-2xl shadow-[#263238]", props.className)}>
                {props.children}
            </div>

        </div>

    )

}

export default Modal