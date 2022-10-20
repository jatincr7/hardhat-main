import express  from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import profileRoutes from './routes/profile.js'
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(function(req, res, next) {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//       jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'BUZZINGO', function(err, decode) {
//         if (err) req.user = undefined;
//         req.user = decode;
//         next();
//       });
//     } else {
//       req.user = undefined;
//       next();
//     }
//   });

const CONNECTION_URL ='mongodb+srv://jatincr7:Almighty123@cluster0.jqjmdtj.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8080;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
).catch((error) =>
   console.log('some error occured while making database connection', error.message)
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors());

app.use('/auth', userRoutes);
app.use('/upload',profileRoutes)
export default app;

