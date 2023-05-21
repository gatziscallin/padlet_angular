export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const PadletFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Ein Padlettitel muss angegeben werden'),
  new ErrorMessage('id', 'required', 'Es muss eine ID angegeben werden'),
  new ErrorMessage('is_public', 'required', 'Es muss ein Status angegeben werden'),
  new ErrorMessage('user_id', 'required', 'Es muss eine User ID angegeben werden')
];
