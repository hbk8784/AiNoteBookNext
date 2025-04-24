
export interface NoteCardPropType {
  id:string,
  color: string;
  date: string;
  title: string;
  truncatedContent: string;
  content: string;
  handleSummeryBtn: (content: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  setEditInfo: (value: { id: string; notes: string; title: string }) => void;
}
