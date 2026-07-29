import { Contact } from '../db/models/contact.js';
import mongoose from 'mongoose';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  // Geçersiz ID kontrolü
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return null;
  }
  return await Contact.findById(contactId);
};
