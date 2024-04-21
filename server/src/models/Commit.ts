import mongoose from 'mongoose';
interface ICommit {
  uniqueIdentifier: string;
  date: Date;
  message: string;
  author: string;
  repoName: string;
}

const commitSchema = new mongoose.Schema({
  uniqueIdentifier: { type: String, unique: true },
  date: Date,
  message: String,
  author: String,
  repoName: String,
});

const Commit = mongoose.model<ICommit>('Commit', commitSchema);

export default Commit;
