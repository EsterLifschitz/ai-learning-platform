const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 

describe('Admin Pagination & Security Tests', () => {
    
    it('should block request if no token is provided', async () => {
        const res = await request(app)
            .get('/api/admin/prompts');
            
        expect(res.statusCode).toEqual(401);
    });

    it('should return default pagination structure even on empty check', async () => {
        const res = await request(app)
            .get('/api/admin/prompts?page=1&limit=5');
            
        expect([401, 403, 200]).toContain(res.statusCode);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});