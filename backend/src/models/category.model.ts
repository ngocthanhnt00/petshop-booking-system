import mongoose from 'mongoose';

const schema = mongoose.Schema;

const categorySchema = new schema({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});

const category = mongoose.models.category || mongoose.model('category', categorySchema);

export default category;
