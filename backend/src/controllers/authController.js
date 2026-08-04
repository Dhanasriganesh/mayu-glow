import { auth } from '../config/firebaseAdmin.js';
import User from '../models/User.js';

export const signup = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 1. Create Firebase Auth User via Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName || ''} ${lastName || ''}`.trim()
    });

    // 2. Create matching users/{uid} document in Firestore with role: "user"
    await User.create(userRecord.uid, {
      firstName,
      lastName,
      phone,
      email
    });

    res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid,
      email: userRecord.email
    });
  } catch (error) {
    next(error);
  }
};
