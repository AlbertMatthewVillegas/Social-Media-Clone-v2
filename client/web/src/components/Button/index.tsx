function Button({...props}) {
    return (
        <button {...props} className={"border cursor-pointer border-[#948D83] text-white rounded-md px-4 py-2 hover:bg-[#F9DD55] hover:border-none hover:text-black justify-center flex min-w-30 " + props.className}>
            {props.children}
        </button>
    );
}

export default Button