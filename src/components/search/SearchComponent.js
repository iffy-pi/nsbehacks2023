import { useState } from "react"
import Button from "../common/Button"
import TextField from "../common/TextField"
import Filters from "./Filters"
import { apiJSONFetch, ContentStates } from "../../functions/common"

const SearchComponent = ({ response, setResponse }) => {
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

    const onSearch = async () => {
        const req = {
            query: query,
            filters: filters
        }

        setResponse({...response, contentState: ContentStates.loading})

        let success = false
        let error = ''
        let body = null

        try {
            const res = await apiJSONFetch('test', 'POST', {}, req)
            if ( !res.success ) throw new Error('Invalid response: '+res)


            success = true
            // On success, return the server response to the system
            body = res.content
        } catch ( error ){
            // On error, then we can set the response fields
            success = false
            error = String(error)
        }

        setResponse({...response, 
            contentState: ContentStates.set,
            success: success,
            body: body,
            error: error
        })
    }

    return (
        <div>
            <TextField returnText={updateQuery} placeholder="Search here"/>
            <Button buttonText="Search" onClick={onSearch}/>
            <Button buttonText="Filters" onClick={toggleShowFilters}/>

            {
                ( showFilters ) &&
                <Filters filters={filters} setFilters={setFilters}/>
            }
        </div>
    )
}

export default SearchComponent