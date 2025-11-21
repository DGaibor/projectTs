import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { productRouter} from './src/product/product.router';
import { userRouter } from './src/user/user.router';
// configures dotenv to work in your application
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use('/products', productRouter);
app.use('/users', userRouter);


app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
