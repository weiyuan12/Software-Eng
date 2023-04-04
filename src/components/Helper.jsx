export async function getGeoCode (addr){
    try{
    const response = await fetch('https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDYGr_HjF-fweWsSFmtKc2_Jc802Dcb7Fc', 
    {
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({ 
            "address": 
            {
                "regionCode" : "SG",
                "addressLines": [addr],
    
            }
        })
    })
    const responseData = await response.json()
    console.log(responseData.result)
        if(responseData.result.address.addressComponents[0].confirmationLevel != "CONFIRMED" ){
            alert("Enter a valid location")
            return {};
        }
        else{
            const geoCode = responseData.result.geocode.location
            return geoCode
        }
    }
    catch (err){
        console.log(err)
    }

}