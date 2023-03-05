import express, { type Request, type Response, } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { User } from '../entity/User.js';
import { AppDataSource } from '../data-source.js';

export const loginRouter = express.Router();
loginRouter.use(express.json(),);

loginRouter.post('/register', async (req: Request, res: Response) => {
    const { username, name, email, password } = req.body;
    
    if(!username || !name || !email || !password) {
        res.send('Improper values');
        return;
    }

    const userRepository = AppDataSource.getMongoRepository(User);

    const expectedUser = await userRepository.findOneBy({username: username})
    if(!expectedUser){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
            
            const newUser = new User();
            
            newUser.username = username;
            newUser.name = name;
            newUser.email = email;
            newUser.passwordHash = hashedPassword;
            
            await newUser.save();
        
            res.send('Success');
    }
    else{
        res.send('User already exists');
    }

})

loginRouter.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    res.send('Success');
})

loginRouter.get('/user', async (req: Request, res: Response) => {
    res.send(req.user);
})

loginRouter.get('/logout', async (req: Request, res: Response) => {
    req.logout((err: Error) => {
        if(err) throw err;
        res.send('Success')
    });
    
})
