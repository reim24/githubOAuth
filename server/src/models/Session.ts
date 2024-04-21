import mongoose from 'mongoose';
interface ISession {
  session: { userId: number; username: string; accessToken: string };
}
const sessionSchema = new mongoose.Schema(
  {},
  { collection: 'sessions', strict: false }
);
const Session = mongoose.model<ISession>('Session', sessionSchema);

export default Session;
