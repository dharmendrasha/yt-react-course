export const CustomButtons = (props) => {
    return (
        <>
            <button 
                onClick={() => typeof props.onClick === 'function' ? props.onClick() : null} 
                type="button btn-block btn-lg" 
                type="submit"
                class={`btn btn-${props.color || 'primary'}`}>
                    {props.label}
            </button>
        </>
    )
}