// Desc: Profile middleware
const profileMiddleware = (req, res, next) => {
    console.log("Profile middleware");
    next();
}

const profileIdMiddleware = (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send('Id is required');
        }
        // Check if id is a valid number
        if (isNaN(id)) {
            return res.status(400).send('Id must be a number');
        }

        // Optionally, you can cast the id to an integer if needed
        const parsedId = parseInt(id, 10);

        res.status(200).send(`Id is present ${id}`);
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

export { profileMiddleware, profileIdMiddleware };