import { useState } from "react"
import Button from "../common/Button"
import TextField from "../common/TextField"
import Filters from "./Filters"

const SearchComponent = ({ }) => {
    const [ query, setQuery ] = useState('')

    const [ showFilters, setShowFilters ] = useState(false)
    const [ filters, setFilters ] = useState({
        priceRange: [-1, -1],
        locationRange: 1, // in kilometres
        hairTypes: []
    })
    

    // updates query to the text in the search field
    const updateQuery = (text) => {
        setQuery(text)
    }

    const toggleShowFilters = () => {
        setShowFilters(!showFilters)
    }


    return (
        <div>
            <TextField returnText={updateQuery} placeholder="Search here"/>
            <Button buttonText="Search"/>
            <Button buttonText="Filters" onClick={toggleShowFilters}/>

            {
                ( showFilters ) &&
                <Filters filters={filters} setFilters={setFilters}/>
            }
        </div>
    )
}

export default SearchComponent