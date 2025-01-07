const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const connectDB = require('./db/db');
connectDB()


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});