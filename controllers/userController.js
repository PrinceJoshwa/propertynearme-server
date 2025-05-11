// import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// const googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body;
    
//     // Verify the access token with Google
//     const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to verify token');
//     }
    
//     const userData = await response.json();
//     const { name, email, sub: googleId } = userData;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         googleId,
//       });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error('Google Auth Error:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// export { googleAuth };


// import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// const googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body;
    
//     // Verify the access token with Google
//     const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to verify token');
//     }
    
//     const userData = await response.json();
//     const { name, email, sub: googleId } = userData;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         googleId,
//       });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error('Google Auth Error:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// export { googleAuth };

// import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// const googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body;
    
//     // Verify the access token with Google
//     const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to verify token');
//     }
    
//     const userData = await response.json();
//     const { name, email, sub: googleId } = userData;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         googleId,
//       });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error('Google Auth Error:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// export { googleAuth };

import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "ba0abe36fed09db9da31df5d64749b9293c07096a166a7ba834d71524615a96b579b980161aefd1c370b0978c892c9ff6e1d328602a20b7af7094a7db534462e", {
    expiresIn: "30d",
  })
}

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ message: "Token is required" })
    }

    console.log("Received token from frontend:", token.substring(0, 20) + "...")

    // Verify the access token with Google
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      console.error("Google API response not OK:", response.status, response.statusText)
      const errorData = await response.text()
      console.error("Google API error response:", errorData)
      return res.status(401).json({ message: "Failed to verify token with Google" })
    }

    const userData = await response.json()
    console.log("Google user data received:", JSON.stringify(userData).substring(0, 100) + "...")

    const { name, email, sub: googleId } = userData

    if (!email) {
      return res.status(400).json({ message: "Email not provided by Google" })
    }

    let user = await User.findOne({ email })

    if (!user) {
      console.log("Creating new user with email:", email)
      user = await User.create({
        name: name || "User",
        email,
        googleId,
      })
    } else {
      console.log("Found existing user with email:", email)
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error("Google Auth Error:", error)
    res.status(401).json({ message: "Invalid token" })
  }
}

export { googleAuth }
