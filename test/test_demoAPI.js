const { assert } = require('chai');
const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

describe('API Test for "reqres-in"', () => {
    const BASE_URL = "https://reqres.in/api/"
    it('Test - GET All Object', async () => {
        const response = await request(BASE_URL)
        .get("unknown")
        
               
        //assertion
        assert.equal(response.statusCode,200);
        assert.equal(response.body.data[0].name, "cerulean");
        assert.equal(response.body.data[1].color, "#C74375");
        
        const schemaPath = "resources/jsonSchema/get-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - POST Store Object', async () => {  
        const Body = {
            "name": "morpheus",
            "job": "leader"
        }
        const response = await request(BASE_URL)
        .post("users")
        .send(Body) 
        
        //assertion
        assert.equal(response.statusCode,201);
        assert.equal(response.body.name, "morpheus");
        assert.equal(response.body.job, "leader");
        assert.isString(response.body.id);

        const schemaPath = "resources/jsonSchema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('Test - DELETE All Object', async () => {
        const response = await request(BASE_URL)
        .delete("users/2")
                       
        //assertion
        assert.equal(response.statusCode,204);
    });

    it('Test - PUT Store Object', async () => {  
        const Body = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await request(BASE_URL)
        .put("users/2")
        .send(Body) 
        
        //assertion
        assert.equal(response.statusCode,200);
        assert.equal(response.body.name, "morpheus");
        assert.equal(response.body.job, "zion resident");
        assert.isString(response.body.updatedAt, "2024-08-19T06:33:48.770Z");

        const schemaPath = "resources/jsonSchema/put-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });
});