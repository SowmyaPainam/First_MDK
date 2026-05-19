// /**
//  * Returns total customer count
//  * @param {IClientAPI} clientAPI
//  */
// export default function Customer_Count(clientAPI) {
//     return clientAPI.read(
//         '/First_MDK/Services/com_sap_edm_sampleservice_v4.service',
//         'Customers',
//         [],
//         ''
//     ).then(result => {
//         return result.length;
//     }).catch(error => {
//         console.log(error);
//         return 0;
//     });
// }
// /**
//  * Returns total customer count
//  * @param {IClientAPI} clientAPI
//  */
// export default function Customer_Count(clientAPI) {

//     return clientAPI.read(
//         '/First_MDK/Services/com_sap_edm_sampleservice_v4.service',
//         'Customers',
//         [],
//         '$count=true'
//     ).then((result) => {

//         // Debug logs
//         console.log("Result:", JSON.stringify(result));
//         console.log("Length:", result.length);

//         return result.length;

//     }).catch((error) => {

//         console.log("Read Error:", error);

//         return 0;
//     });
// }
/**
 * Returns customer count using $count
 * @param {IClientAPI} clientAPI
 */
export default function count_customer(clientAPI) {

    return clientAPI.count(
        '/First_MDK/Services/com_sap_edm_sampleservice_v4.service',
        'Customers',
        ''
    ).then((count) => {

        // console.log("Customer Count:", count);

        return count;

    }).catch((error) => {

        // console.log(error);

        return 0;
    });
}
