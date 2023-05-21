export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const EntrieFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden'),
  new ErrorMessage('content', 'required', 'Ein Inhalt muss angegeben werden'),
  new ErrorMessage('id', 'required', 'Es muss eine ID angegeben werden'),
  new ErrorMessage('padlet_id', 'required', 'Es muss ein Padlet angegeben werden'),
  new ErrorMessage('user_id', 'required', 'Es muss eine User ID angegeben werden')
];
