import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const generateToken = (user) => {
  return jsonwebtoken.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
}

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    if (!email){
      return res.status(400).json({ error: 'Provide Valid Email' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password length must be at least 8 characters' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: 'User signed up successfully', userData: newUser });
  } catch (err) {
    console.error('Error signing up user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signIn = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  let token = '';
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    if(user && isPasswordValid) {
      token = generateToken(user);
    }
    res.status(200).json({ message: 'User signed in successfully', token });
  } catch (err) {
    console.error('Error signing in user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { signUp, signIn };
