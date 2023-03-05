import { useState } from "react"

const TextField = ({ returnText, placeholder, initialText }) => {
    const [ inputText, setInputText ] = useState(initialText)

    const onTextChange = (newText) => {
        returnText(newText)
        setInputText(newText)
    }


    return (
            <input type="text" placeholder={placeholder}
            value={inputText} onChange={(e) => onTextChange(e.target.value)} />
    )
}

TextField.defaultProps = {
    returnText: (text) =>  {},
    placeholder: "",
    initialText: ""
}

export default TextField