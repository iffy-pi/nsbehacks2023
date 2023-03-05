import { useState } from "react"

const TextField = ({ returnText }) => {
    const [ inputText, setInputText ] = useState('')

    const onTextChange = (newText) => {
        returnText(newText)
        setInputText(newText)
    }


    return (
            <input type="text" placeholder="Search here"
            value={inputText} onChange={(e) => onTextChange(e.target.value)} />
    )
}

TextField.defaultProps = {
    returnText: (text) =>  {}
}

export default TextField