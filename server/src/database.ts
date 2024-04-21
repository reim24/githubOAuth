import { connect } from 'mongoose';
const initialize = async () => {
  let connection = await connect(process.env.MONGODB_URI!);

  if (connection) console.log('Database is connected...');
  return connection;
};
export default { initialize };
