export interface Note {
  _id: string,
  // Text is optional because we can have a note with only a title
  text?: string,
  title: string,
  createdAt: string,
  updatedAt: string,
}
