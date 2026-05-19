/**
 * CustomersEdit_Save.js
 * Validates all fields professionally and saves (UpdateEntity).
 * @param {IClientAPI} clientAPI
 */
export default function EmailValidation(clientAPI) {
 
  // ---------- Helper: safely read Form Cell value ----------
  function getValue(controlName) {
    try {
      const pageProxy = clientAPI.getPageProxy ? clientAPI.getPageProxy() : clientAPI;
      const form = pageProxy.getControl('FormCellContainer');
      const ctrl = form.getControl(controlName);
      const val = ctrl.getValue();
      return (val === undefined || val === null) ? '' : String(val).trim();
    } catch (e) {
      // Fallback (works if FormCellContainer name differs)
      const v = clientAPI.evaluateTargetPath(`#Control:${controlName}/#Value`);
      return (v === undefined || v === null) ? '' : String(v).trim();
    }
  }
 
  // ---------- Put your REAL control names here ----------
  const firstName = getValue('FCFirstName');
  const lastName  = getValue('FCLastName');
  const phone     = getValue('FCPhone');
 
  // ⚠️ Update this if your Email control name is different
  const email     = getValue('FCEmail');   // maybe FCEmailAddress in your page
 
  // ---------- Validation rules (professional) ----------
  const errors = [];
 
  // Mandatory checks
  if (!firstName) errors.push('• First name is required.');
  if (!lastName)  errors.push('• Last name is required.');
  if (!phone)     errors.push('• Phone number is required.');
  if (!email)     errors.push('• Email address is required.');
 
  // Name validation: letters + spaces + . ' - (no digits)
  const nameRegex = /^[A-Za-z][A-Za-z\s.'-]{1,39}$/;
  if (firstName && !nameRegex.test(firstName)) {
    errors.push('• First name must contain only letters (no numbers or special characters).');
  }
  if (lastName && !nameRegex.test(lastName)) {
    errors.push('• Last name must contain only letters (no numbers or special characters).');
  }
 
  // Phone validation: allow + and 10 to 15 digits
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.push('• Phone number must contain 10–15 digits (optional + at start).');
  }
 
  // Email validation (simple, professional)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('• Enter a valid email address (example: name@company.com).');
  }
 
  // ---------- If validation fails, show ONE clean message ----------
  if (errors.length > 0) {
    return clientAPI.executeAction({
      "Name": "/First_MDK/Actions/ShowMessage.action",
      "Properties": {
        "Title": "Validation",
        "Message": "Please correct the following before saving:\n\n" + errors.join('\n')
      }
    });
  }
 
  // ---------- If validation passes, execute UpdateEntity ----------
  return clientAPI.executeAction("/First_MDK/Actions/Customers_UpdateEntity1.action");
}
 