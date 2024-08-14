import express from 'express';
import { Server } from 'ws';
import { createServer } from 'http';
import { setupWebSocket } from './wsHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new Server({ server });

setupWebSocket(wss);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
