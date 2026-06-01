import jwt from 'jsonwebtoken';
const secret = "secretkey"
export const auth =  (req, res, next) => {
    console.log(req.headers.authorization);
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            message: 'Token required'
        });
    }

    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(
            token,
            // process.env.JWT_SECRET
            secret
        );

        req.user = payload;

        next();

    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

