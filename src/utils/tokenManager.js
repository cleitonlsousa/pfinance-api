import jwt from 'jsonwebtoken';

export const generateToken = (uid) => {
    try {

        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn: 300 })
        return {token, expiresIn: 300}
    } catch (error) {
        console.log(error)
    }
}