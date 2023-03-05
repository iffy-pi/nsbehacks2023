const HairTypes = [
    '1',
    '2A',
    '2B',
    '2C',
    '3A',
    '3B',
    '3C',
    '4A',
    '4B',
    '4C'
]

// NaN is the only value that is not equal to itself
const isNaN = (maybeNaN) => maybeNaN!=maybeNaN;


/*
    Returns a Response object for a given API call, repsonse object is of the format:
    {
        success: true or false based on result of call
        status: http status for the call
        content: contains JSON for success call or client side error call, contains text for other failures
    }
*/
async function apiJSONFetch(apiPath, method, headers, body ) {

    const request = {
        method: method
    }

    if ( headers !== null && headers !== {} ){
        request.headers = headers
    }

    if ( body !== null ){
        if ( request.headers['content-type'] === undefined ){
            request.headers['content-type'] = 'application/json'
            request.body = JSON.stringify(body)
        }
    }
    // Make the request
    const res = await fetch(
        `http://127.0.0.1:5000/api/${apiPath}`,
        request
    )

    const response = {
        success: true,
        status: res.status
    }

    if ( res.status !== 200 ){
        // check if it is a client side error, api always returns 400,
        // if it is then we can return the JSON message
        response.success = false

        response.content = ( res.status === 400) ? await res.json() : await res.text()
        return response
    }

    // check if we have json which we should have
    response.content = await res.json()

    return response
}

const ContentStates = {
    unset: 0,
    loading: 1,
    set: 2
}

export {
    HairTypes,
    isNaN,
    apiJSONFetch,
    ContentStates
}