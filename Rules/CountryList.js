/**
 * Returns unique country values from Customers entity for ListPicker
 * @param {IClientAPI} clientAPI
 */
export default function CountryList(clientAPI) {
    return clientAPI.read(
        '/First_MDK/Services/com_sap_edm_sampleservice_v4.service',
        'Customers',
        [],
        '$select=Country'
    ).then(result => {
        let uniqueCountries = [];
        let seen = new Set();

        for (let i = 0; i < result.length; i++) {
            let country = result.getItem(i).Country;

            if (country && country.trim() !== '') {
                let trimmedCountry = country.trim();
                let key = trimmedCountry.toLowerCase();

                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueCountries.push({
                        Name: trimmedCountry,
                        ReturnValue: trimmedCountry
                    });
                }
            }
        }

        return uniqueCountries;
    });
}