const restrictTo = (...roles) => {
          return (req, res, next) => {
            // req.user comes from authMiddleware
            if (!roles.includes(req.user.role)) {
              return res.status(403).json({
                error: 'You do not have permission'
              });
            }
        
            next();
          };
        };
        
        module.exports = { restrictTo };