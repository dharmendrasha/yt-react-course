


export const CustomInput = (props /* */) => {
    return (
        <input onKeyDown={() => console.log("abcd")} class="form-control" onClick={() => console.log("button is clicked")} onInput={(event) => props.onInput(event.target.value)} name={props.name || 'task'} type={props.type || 'text'} placeholder={props.placeholder || 'input'} aria-label={props.ariaLabel || 'task'} readonly />
    )
}