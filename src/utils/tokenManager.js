import jwt from 'jsonwebtoken';

export const tokenVerificationError = {
    'invalid signature': 'Formato JWT inválido',
    'jwt expired': 'JWT expirado',
    'invalid token': 'Token inválido',
    'No Bearer': 'Token no formato Bearer obrigatório',
    'jwt malformed': 'Formato JWT inválido'
}

export const generateToken = (uid) => {
    try {

        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn: 300 })
        return {token, expiresIn: 300}
    } catch (error) {
        console.log(error)
    }
}

export const generateRefreshToken = (uid, res) => {
    try {
        const expiresIn = 60 * 60 * 24 * 30;
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn})

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === 'developer'),
            expires: new Date(Date.now() + expiresIn * 1000)
        })

    } catch (error) {
        console.log(error)
    }
}