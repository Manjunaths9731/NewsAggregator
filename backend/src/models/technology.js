import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema({
  source: { type: String, required: true },
  author: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  url: { type: String, required: true },
  urlToImage: { type: String, default: '' },
  publishedAt: { type: Date, required: true },
  content: { type: String, default: ''  }
}, {
  collection: 'technology'
});

const technologyModel = mongoose.model('Technology', technologySchema);

export default technologyModel;