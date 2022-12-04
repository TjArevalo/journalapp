export interface JournalEntry {
  id: string,
  title?: string,
  body?: string,
  journalDate_created: string,
  journalDate_update?: string,
  entryOwner: string,
};