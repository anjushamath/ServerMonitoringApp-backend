import { Server } from 'ws';
import { fetchEndpointData } from './fetchData';
import { EndpointData } from './types';

export function setupWebSocket(wss: Server) {
  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));
    
    const interval = setInterval(async () => {
      const data: EndpointData[] = await fetchEndpointData();
      ws.send(JSON.stringify(data));
    }, Number(process.env.FETCH_INTERVAL) || 3000);

    ws.on('close', () => {
      clearInterval(interval);
    });
  });
}
