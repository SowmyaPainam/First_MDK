export default function SaveCustomerAndSalesOrder(clientAPI) {
    const page = clientAPI.getPageProxy();
    const customerData = clientAPI.getAppClientData().CustomerData;

    if (!customerData) {
        return clientAPI.executeAction({
            "Name": "/First_MDK/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Error",
                "Message": "Customer data is missing. Please restart the process."
            }
        });
    }

    const createdAt = page.evaluateTargetPath('#Control:FCCreatedate/#Value');
    const currencyCode = page.evaluateTargetPath('#Control:FCCreateCurrencyCode/#Value');
    const grossAmount = page.evaluateTargetPath('#Control:FCCreateGrossAmount/#Value');
    const netAmount = page.evaluateTargetPath('#Control:FCCreateNetAmount/#Value');
    const taxAmount = page.evaluateTargetPath('#Control:FCCreateTaxAmount/#Value');

    if (!currencyCode || !netAmount) {
        return clientAPI.executeAction({
            "Name": "/First_MDK/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Validation",
                "Message": "Please complete required sales order fields."
            }
        });
    }

    return clientAPI.executeAction({
        "Name": "/First_MDK/Actions/Customers_CreateEntity.action",
        "Properties": {
            "Properties": {
                "FirstName": customerData.FirstName,
                "LastName": customerData.LastName,
                "PhoneNumber": customerData.PhoneNumber,
                "EmailAddress": customerData.EmailAddress,
                "Country": customerData.Country,
                "DateOfBirth": customerData.DateOfBirth

            }
        }
    }).then((customerResult) => {
        const createdCustomer = customerResult.data;

        return clientAPI.executeAction({
            "Name": "/First_MDK/Actions/SalesOrderHeaders_CreateEntity.action",
            "Properties": {
                "Properties": {
                    "CreatedAt": createdAt,
                    "CurrencyCode": currencyCode,
                    "GrossAmount": grossAmount,
                    "NetAmount": netAmount,
                    "TaxAmount": taxAmount,
                    "CustomerID": createdCustomer.CustomerID
                }
            }
        });
    }).then(() => {
        delete clientAPI.getAppClientData().CustomerData;
        return clientAPI.executeAction('/First_MDK/Actions/CloseModalPage_Complete.action');
    });
}