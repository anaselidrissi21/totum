module.exports = {
    mockRequest: () => {
        const req = {};
        req.body = jest.fn().mockReturnValue(req);
        req.params = jest.fn().mockReturnValue(req);
        return req;
    },
    mockResponse: () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    },
    mockNext: () => {
        const next = jest.fn();
        return next;
    },
    mockError: () => {
        const err = {};
        err.status = jest.fn().mockReturnValue(err);
        err.json = jest.fn().mockReturnValue(err);
        return err;
    },
};
