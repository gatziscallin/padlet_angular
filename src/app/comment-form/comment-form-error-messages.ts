export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const CommentFormErrorMessages = [
  new ErrorMessage('comment', 'required', 'Ein Kommentar muss angegeben werden'),
  new ErrorMessage('id', 'required', 'Es muss eine ID angegeben werden'),
  new ErrorMessage('entry_id', 'required', 'Es muss ein Eintrag angegeben werden'),
  new ErrorMessage('user_id', 'required', 'Es muss eine User ID angegeben werden')
];
