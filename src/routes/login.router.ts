import express, { type Request, type Response, } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { User, IUser } from '../models/user.js';

export const loginRouter = express.Router();
loginRouter.use(express.json(),);

loginRouter.post('/register', async (req: Request, res: Response) => {
    const { username, name, email, password } = req.body;
    
    if(!username || !name || !email || !password) {
        res.send('Improper values');
        return;
    }

    User.findOne({username}, async(err: Error, doc: IUser) => {
        if(err) throw err;
        if(doc) res.send('User already exists');
        if(!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            
            const newUser = new User ({
                username,
                name,
                email,
                passwordHash: hashedPassword,
            })
            
            await newUser.save();
        
            res.send('Success');
        }
    })

})

loginRouter.post('/login', passport.authenticate('local', (req: Request, res: Response) => {
    res.send('Successfully authenticated');
}))

loginRouter.get('/user', async (req: Request, res: Response) => {
    res.send(req.user);
})