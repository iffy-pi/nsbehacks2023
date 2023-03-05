import ContentLoading from "./content-states/ContentLoading"
import ContentUnset from "./content-states/ContentUnset"
import { ContentStates } from "../../functions/common"
import ContentError from "./content-states/ContentError"
import ResultTile from "./ResultTile"

const Results = ({ response }) => {
    const renderContentForState = (contentState) => {
        switch(contentState) {
            case ContentStates.unset:
                return (<ContentUnset />)
            case ContentStates.loading:
                return (<ContentLoading />)
            default:
                return (<div><p>Unknown</p></div>)
        }
    }

    return (
        <div className="bcontainer">
            {/* For loading content or no content available */}
            {  ( response.contentState !== ContentStates.set) && renderContentForState(response.contentState) }
                
            {/* Errorneous request */}
            { (response.contentState === ContentStates.set && !response.success) && <ContentError message={response.error} />}

            {/* For rendedering returned data */}
            { (response.contentState === ContentStates.set && response.success ) && 
                    response.body.results.offerings.map((ofrg) => (
                        <ResultTile offering={ofrg} stylistInfo={ response.body.results.stylistinfo[String(ofrg.stylistid)] } /> 
                    ))
            }
        </div>
    )
}

export default Results