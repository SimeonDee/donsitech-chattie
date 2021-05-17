const User = require('../models/User');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        const users = await User.find({});
        res.json({ users: users });
    } catch(err){
        res.status(500).json({ message: err.message });
    }   
});

router.post('/', async (req, res) => {
    const username = req.body.username || "user@mail.com";
    const password = req.body.password || "password";
    const fullname = req.body.fullname || "fullname";
    const display_name = req.body.display_name || req.body.fullname;
    const passport_uri = req.body.passport_uri || "/images/passport_default_icon.png";
    const status_msg = req.body.status_msg || "";

    console.log(req.body);

    const newUser = new User({
        username,
        password,
        fullname,
        display_name,
        passport_uri,
        status_msg,
    });

    try{
        const user = await newUser.save();
        res.status(201).json({ user: user });
    } catch(err){
        res.status(400).json({ message: err.message });
    }   
});

router.post('/authenticate', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const user = await User.findOne({ username: username, password: password });
        res.json({ user: user });
        
    } catch(err){
        res.status(400).json({ message: err.message });
    }  

});

// Get a user
router.get('/:id', async (req, res) => {
    try{
        const foundUser = await User.findById({ _id: req.params.id });
        if (foundUser === null){
            res.status(404).json({ message: 'User not found' })
        } else{
            res.json({ user: foundUser });
        }
        
    } catch(err){
        res.status(500).json({ message: err.message });
    }   
});

// Update a user
router.patch('/:id', findUser, async (req, res) => {
    // if(req.body.username){
    //     res.user.username = req.body.username;   
    // }

    // if(req.body.password){
    //     res.user.password = req.body.password;   
    // }

    // if(req.body.fullname){
    //     res.user.fullname = req.body.fullname;   
    // }

    // if(req.body.display_name){
    //     res.user.display_name = req.body.display_name;   
    // }

    // if(req.body.passport_uri){
    //     res.user.passport_uri = req.body.passport_uri;   
    // }

    // if(req.body.status_msg){
    //     res.user.status_msg = req.body.status_msg;   
    // }

    try{
        // const updatedUser = await res.user.save();
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({ user: updatedUser });

    } catch(err){
        res.status(400).json({ message: err.message });
    }   
});

router.delete('/:id', findUser, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'User deleted successfully' });

    } catch(err){
        res.status(400).json({ message: err.message });
    } 
});

// Find user middleware
async function findUser(req, res, next){
    try{
        const foundUser = await User.findById({ _id: req.params.id });
        if (foundUser === null){
            res.status(404).json({ message: 'User not found' })
        }
        
        res.user = foundUser;
        next();
        
    } catch(err){
        res.status(500).json({ message: err.message });
    }   
}

module.exports = router;