export default function CustomerStep1_Next(clientAPI) {
    const page = clientAPI.getPageProxy();

    const firstName = page.evaluateTargetPath('#Control:FCCreateFirstName/#Value');
    const lastName = page.evaluateTargetPath('#Control:FCCreateLastName/#Value');
    const phoneNumber = page.evaluateTargetPath('#Control:FCCreatePhone/#Value');
    const emailAddress = page.evaluateTargetPath('#Control:FCCreateEmail/#Value');
    const country = page.evaluateTargetPath('#Control:Country/#SelectedValue');
    const dateOfBirth = page.evaluateTargetPath('#Control:FCCreateDOB/#Value');

    if (!firstName || !lastName || !phoneNumber || !emailAddress || !dateOfBirth) {
        return clientAPI.executeAction({
            "Name": "/First_MDK/Actions/GenericMessageBox.action",
            "Properties": {
                "Title": "Validation",
                "Message": "Please fill all required customer fields."
            }
        });
    }

    // Store temporarily
    clientAPI.getAppClientData().CustomerData = {
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phoneNumber,
        EmailAddress: emailAddress,
        Country: country,
        DateOfBirth: dateOfBirth
    };

    // Navigate to Sales Order page
    return clientAPI.executeAction("/First_MDK/Actions/NavToSalesOrderHeaders.action");
}