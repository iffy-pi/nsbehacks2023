

const ResultTile = ({offering, stylistInfo}) => {

    const genPriceRangeStr = (priceArr) => {
        return `$${priceArr[0]} - $${priceArr[priceArr.length-1]}`
    }

    return (
        <div className="bcontainer">
            <p><b>{offering.name}</b></p>
            <p><i>{genPriceRangeStr(offering.price)}</i></p>

            <p><b><i>By {stylistInfo.name}</i></b></p>
            <ul>
                {
                    [ 
                        ["Instagram:", "instagram"],
                        ["Email:", "email"],
                        ["Phone No:", "phoneno" ]
                    ].map((k) => (
                        <li><b>{`${k[0]} `}</b>{stylistInfo.contacts[k[1]]}</li>
                    ))
                }
                <li><b>Location: </b>{stylistInfo.location.city}</li>
            </ul>
            <p><i>Policies:</i></p>
            <ul>
                {
                    stylistInfo.policies.map( (p) => (
                        (p !== '') && <li>{p}</li>
                    ))
                }
            </ul>

        </div>
    )
}

export default ResultTile