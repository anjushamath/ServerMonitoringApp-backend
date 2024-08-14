import axios from 'axios';
import { EndpointData } from './types';

const ENDPOINTS = "https://data--us-east.upscope.io/status?stats=1,https://data--eu-west.upscope.io/status?stats=1,https://data--eu-central.upscope.io/status?stats=1,https://data--us-west.upscope.io/status?stats=1,https://data--sa-east.upscope.io/status?stats=1,https://data--ap-southeast.upscope.io/status?stats=1";
const endpoints = ENDPOINTS!.split(',');

export async function fetchEndpointData(): Promise<EndpointData[]> {
  const data: EndpointData[] = [];

  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(endpoint);
      data.push({
        hostname: new URL(endpoint).hostname,
        region: response.data.region,
        status: response.data.status || 'unknown',
        timestamp: new Date().toISOString(),
        results: response.data.results,
      });
    } catch (error) {
      data.push({
        hostname: new URL(endpoint).hostname,
        region: 'error',
        status: 'error',
        timestamp: new Date().toISOString(),
        results: [],
      });
    }
  }

  return data;
}
