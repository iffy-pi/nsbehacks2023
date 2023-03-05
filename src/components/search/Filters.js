import { useEffect, useState } from "react"
import { isNaN, HairTypes } from "../../functions/common"
import Button from "../common/Button"
import TextField from "../common/TextField"

const Bounds = {
    min: 0,
    max: 1
}

const defHairtypesList = HairTypes.map((item, i) =>  { return {id: i, value: item, selected: false} })

const Filters = ({filters, setFilters}) => {

    const [ hairTypesList, setHairTypesList ] = useState(defHairtypesList)

    const updatePriceRange = (boundIndx, value) => {
        // Update the min or max bound based on the request
        const pr = [...filters.priceRange]

        let newval;
        if ( value === "" ) newval = -1
        else{
            newval = parseInt(value)
            if ( isNaN(newval) || newval < 0 ) {
                alert("Invalid price range value!")
                return
            }
        }

        pr[boundIndx] = newval

        if ( pr[0] !== -1 && pr[1] !== -1 && pr[0] > pr[1] ) {
            alert("Minimum price range must be less than maximum price range!")
            return
        }

        setFilters({...filters, priceRange:[...pr]})

    }

    const renderPriceRange = (bound) => {
        if ( filters.priceRange[bound]  === -1 ) return ""
        return String(filters.priceRange[bound])
    }

    const showFilters = () => {
        console.log(filters)
    }

    const setLocationRange = (text) => {
        let val;
        if ( text === "" ) val = 1
        else {
            val = parseInt(text)
            if ( isNaN(val) || val < 0 ) {
                alert("Invalid location range!")
                return
            }
        }

        setFilters({ ...filters, locationRange: val})
    }

    const toggleHairTypeCheck = (id ) => {
        const newopts = hairTypesList.map( (opt) => (
            ( opt.id === id ) ? { ...opt, selected: !opt.selected } : opt
        ))
        
        setHairTypesList(newopts)
    }

    useEffect( () => {
        setFilters({...filters, hairTypes: hairTypesList.filter( opt => opt.selected).map( (opt) => opt.value)})
    }, [hairTypesList])

    return (
        <div className="bcontainer">
            <div>
                <label>Price Range:</label><br/>
                <label>$</label><TextField initialText={renderPriceRange(Bounds.min)} returnText={(text) => updatePriceRange(Bounds.min, text)}/>
                <label> to </label>
                <label>$</label><TextField initialText={renderPriceRange(Bounds.max)} returnText={(text) => updatePriceRange(Bounds.max, text)}/>
            </div>
            <div>
                <label>Within:</label><br/>
                <TextField initialText={filters.locationRange} returnText={setLocationRange}/><label> km</label>
            </div>
            <div>
                <label>Hair Types:</label>
                {
                    hairTypesList.map((opt) => (
                        <div key={opt.id}>
                            <input type="checkbox" id={opt.id} name={`hair_type_${opt.id}`} checked={opt.selected} onChange={() => toggleHairTypeCheck(opt.id)}/>
                            <label htmlFor={`hair_type_${opt.id}`}>{opt.value}</label><br/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Filters