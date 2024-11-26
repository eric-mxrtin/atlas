import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors
import buildingRoutes from './routes/buildings.js';

const app = express();
const PORT = 8080

app.use(cors());

app.use(bodyParser.json());

app.use('/buildings', buildingRoutes);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'))

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

