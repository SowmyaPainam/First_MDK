/**
 * CustomersCreate_Save.js
 * Validates Create page fields and calls CreateEntity action.
 * @param {IClientAPI} clientAPI
 */
export default function CustomersCreateValidation(clientAPI) {

  // ---------- Helper: safely read Form Cell value ----------
  function getValue(controlName) {
    try {
      const pageProxy = clientAPI.getPageProxy ? clientAPI.getPageProxy() : clientAPI;
      const form = pageProxy.getControl('FormCellContainer');
      const ctrl = form.getControl(controlName);
      const val = ctrl.getValue();
      return (val === undefined || val === null) ? '' : String(val).trim();
    } catch (e) {
      const v = clientAPI.evaluateTargetPath(`#Control:${controlName}/#Value`);
      return (v === undefined || v === null) ? '' : String(v).trim();
    }
  }

  // ---------- Create page control names ----------
  const firstName = getValue('FCCreateFirstName');
  const lastName  = getValue('FCCreateLastName');
  const phone     = getValue('FCCreatePhone');
  const email     = getValue('FCCreateEmail');

  // Optional: Country validation
  // If your List Picker Name is Country, this will work
  let country = '';
  try {
    const countryVal = clientAPI.evaluateTargetPath('#Control:Country/#SelectedValue');
    country = countryVal ? String(countryVal).trim() : '';
  } catch (e) {
    country = '';
  }

  // ---------- Validation rules ----------
  const errors = [];

  // Mandatory checks
  if (!firstName) errors.push('• First name is required.');
  if (!lastName)  errors.push('• Last name is required.');
  if (!phone)     errors.push('• Phone number is required.');
  if (!email)     errors.push('• Email address is required.');
  if (!country)   errors.push('• Country is required.');

  // Name validation
  const nameRegex = /^[A-Za-z][A-Za-z\s.'-]{1,39}$/;
  if (firstName && !nameRegex.test(firstName)) {
    errors.push('• First name must contain only letters.');
  }
  if (lastName && !nameRegex.test(lastName)) {
    errors.push('• Last name must contain only letters.');
  }

  // Phone validation
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.push('• Phone number must contain 10–15 digits (optional + at start).');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('• Enter a valid email address (example: name@company.com).');
  }

  // ---------- Show message if errors ----------
  if (errors.length > 0) {
    return clientAPI.executeAction({
      "Name": "/First_MDK/Actions/ShowMessage.action",
      "Properties": {
        "Title": "Validation",
        "Message": "Please correct the following before saving:\n\n" + errors.join('\n')
      }
    });
  }

  // ---------- If valid, call Create action ----------
  return clientAPI.executeAction("/First_MDK/Actions/Customers_CreateEntity.action");
}
