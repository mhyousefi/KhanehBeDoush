const apiUtils = require("./apiUtils")
// @ponicode
describe("apiUtils.checkStatus", () => {
    test("0", () => {
        let callFunction = () => {
            apiUtils.checkStatus({ status: 199, statusText: "ssf" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            apiUtils.checkStatus({ status: 200, statusText: "rss" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            apiUtils.checkStatus({ status: 301, statusText: "rss" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            apiUtils.checkStatus({ status: 200, statusText: "ssf" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            apiUtils.checkStatus({ status: 200, statusText: "esa" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            apiUtils.checkStatus(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("apiUtils.parseJSON", () => {
    test("0", () => {
        let callFunction = () => {
            apiUtils.parseJSON({ json: () => "\"[3,\"false\",false]\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            apiUtils.parseJSON({ json: () => "\"{\"x\":[10,null,null,null]}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            apiUtils.parseJSON({ json: () => "\"\"2006-01-02T14:04:05.000Z\"\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            apiUtils.parseJSON({ json: () => "\"{\"x\":5,\"y\":6}\"" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            apiUtils.parseJSON(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("apiUtils.sendInvalidInputRes", () => {
    test("0", () => {
        let callFunction = () => {
            apiUtils.sendInvalidInputRes({ send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            apiUtils.sendInvalidInputRes({ send: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            apiUtils.sendInvalidInputRes(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("apiUtils.sendServerErrorRes", () => {
    test("0", () => {
        let callFunction = () => {
            apiUtils.sendServerErrorRes({ send: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            apiUtils.sendServerErrorRes({ send: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            apiUtils.sendServerErrorRes(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
