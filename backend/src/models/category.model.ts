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

const categoryModel = mongoose.models.category || mongoose.model('category', categorySchema);

export default categoryModel;
