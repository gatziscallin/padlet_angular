export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const RatingFormErrorMessages = [
  new ErrorMessage('rating', 'required', 'Eine Bewertung muss angegeben werden'),
  new ErrorMessage('entrie_id', 'required', 'Es muss ein Eintrag angegeben werden'),
  new ErrorMessage('user_id', 'required', 'Es muss eine User ID angegeben werden')
];
