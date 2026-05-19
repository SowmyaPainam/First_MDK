/**
 * Returns icon based on Country
 * @param {IClientAPI} clientAPI
 */
export default function Customer_DetailImage(clientAPI) {

    let country = clientAPI.binding.Country;

    switch (country) {

        case 'FR':
            return 'sap-icon://world';

        case 'DE':
            return 'sap-icon://map';

        case 'IN':
            return 'sap-icon://home';

        case 'MX':
            return 'sap-icon://building';

        case 'US':
            return 'sap-icon://flag';

        default:
            return 'sap-icon://customer';
    }
}