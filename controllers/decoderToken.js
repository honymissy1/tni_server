const decoder = (req, res, next) =>{
    // const token = req.headers.authorization.split(' ')[1];
  
    // try {
    //   const decodedToken = jwt.verify(token, process.env.jwtSecret);
  
    //   if (decodedToken.email) {
    //     res.json({ message: 'You have access to the admin route' });
    //     next()
    //   } else {
    //     res.status(401).json({ message: 'Unauthorized' });
    //   }
    // } catch (error) {
    //   res.status(401).json({ message: 'Unauthorized' });
    // }
}

module.exports = {
    decoder
}