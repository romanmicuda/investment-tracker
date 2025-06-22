import axios from "axios";

class API {
    private baseUrl: string;
    private token: string | null = null;

    public constructor(baseUrl: string) {
        // Ensure baseUrl ends with a slash for consistent path appending
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    }
    
    public setToken(token: string): void {
        this.token = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', token);
        }
    }

    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        
        if (this.token && this.token !== undefined && this.token !== 'undefined') {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    private buildUrl(path: string): string {
        // Remove leading slash from path to avoid double slashes
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        // Combine baseUrl with path
        return `${this.baseUrl}${cleanPath}`;
    }

    public async get(path: string, params: Record<string, string | number | boolean> = {}): Promise<any> {
        const url = new URL(this.buildUrl(path));
        Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));
        const response = await axios.get(url.toString(), {
            headers: this.getHeaders(),
        });
        if (!response.status.toString().startsWith('2')) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }

    public async post(path: string, body: object): Promise<any> {
        const url = new URL(this.buildUrl(path));
        console.log('POST URL:', url.toString());
        const response = await axios.post(url.toString(), body, {
            headers: this.getHeaders(),
        });
        if (!response.status.toString().startsWith('2')) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }

    public async put(path: string, body: object): Promise<any> {
        const url = new URL(this.buildUrl(path));
        const response = await axios.put(url.toString(), body, {
            headers: this.getHeaders(),
        });
        if (!response.status.toString().startsWith('2')) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }

    public async delete(path: string): Promise<any> {
        const url = new URL(this.buildUrl(path));
        const response = await axios.delete(url.toString(), {
            headers: this.getHeaders(),
        });
        if (!response.status.toString().startsWith('2')) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const SECURE_API_PATH = process.env.NEXT_PUBLIC_SECURE_API_PATH || '/api';

export const secureApi = new API(`${API_BASE_URL}${SECURE_API_PATH}`);
export const api = new API(API_BASE_URL);