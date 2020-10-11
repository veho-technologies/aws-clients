const AWS = require('aws-sdk')
const s3Client = require('./index')

// jest.genMockFromModule('aws-sdk')
// jest.mock('aws-sdk')

const mockS3GetObject = jest.fn()
const mockS3PutObject = jest.fn()

jest.mock('aws-sdk', () => {
    return {
        S3: jest.fn(() => ({
            getObject: mockS3GetObject,
            putObject: mockS3PutObject
        }))
    };
});

// AWS.mockImplementation(() => );

describe('s3Client', () => {
    beforeEach(() => {
        // mockS3GetObject.mockReset();
        // mockS3PutObject.mockReset();
    })

	test('createS3Client', () => {
	    const result = s3Client.createS3Client()

	    expect(AWS.S3).toHaveBeenCalledTimes(1)
	    expect(AWS.S3).toHaveBeenCalledWith({
		    apiVersion: '2006-03-01',
		    region: 'us-east-1'
		})
	})

	test('getInputFromS3', async () => {
		const mockClient = jest.fn()

        mockS3GetObject.mockImplementation((params) => {
            return {
                promise() {
                    return Promise.resolve({ Body: "test document" })
                }
            };
        });

	    const result = await s3Client.getInputFromS3({
	    	Key: 'foo',
	    	Bucket: 'bar'
	    })

	    expect(mockS3GetObject).toHaveBeenCalledTimes(1)
	    expect(result).toEqual("test document")
	})

	test('putOutputToS3', async () => {
		const mockClient = jest.fn()

        mockS3PutObject.mockImplementation((params) => {
            return {
                promise() {
                    return Promise.resolve()
                }
            };
        });

	    const result = await s3Client.putOutputToS3({
	    	Key: 'foo',
	    	Bucket: 'bar',
	    	Body: 'bar'
	    })

	    expect(mockS3GetObject).toHaveBeenCalledTimes(1)
	    expect(result).not.toBeDefined()
	})

})
