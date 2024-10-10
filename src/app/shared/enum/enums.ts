export enum FormControls {
  Array = 'formArr',
  Country = 'country',
  Username = 'username',
  Birthday = 'birthday',
}

export enum FormStatus {
  Valid = 'VALID',
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Disabled = 'DISABLED',
}

export enum ApiUrl {
  ValidateUser = '/api/checkUsername',
  SubmitForm = '/api/submitForm',
}
