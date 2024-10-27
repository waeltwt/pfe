const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ errors: [{ msg: "Token manquant" }] });
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = verifyToken.id; 
        
        // Vérifiez que req.userId est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(req.userId)) {
            return res.status(400).json({ errors: [{ msg: "ID d'utilisateur invalide" }] });
        }
        
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(400).json({ errors: [{ msg: error.message }] });
    }
};


module.exports = authMiddleware;