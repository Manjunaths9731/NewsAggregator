import mongoose from 'mongoose';

const healthSchema = new mongoose.Schema({
  source: { type: String, required: true },
  author: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  url: { type: String, required: true },
  urlToImage: { type: String, default: '' },
  publishedAt: { type: Date, required: true },
  content: { type: String, default: ''  }
}, {
  collection: 'health'
});

const healthModel = mongoose.model('Health', healthSchema);

export default healthModel;