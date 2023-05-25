class ResponseHelper {
    static sendToMobile(res, err, result, errorMessageData) {
        if (err) {
            this.sendError(res, err);
        } else {
            if (errorMessageData !== '') {
                this.sendErrorMessage(res, errorMessageData);
            } else {
                res.status(200).send({ "state": "success", "data": result });
            }
        }
    };

    static sendToMobileWithUID(res, err, result, errorMessageData, uid) {
        if (err) {
            this.sendErrorWithUID(res, err, uid);
        } else {
            if (errorMessageData !== '') {
                this.sendErrorMessageWithUID(res, errorMessageData, uid);
            } else {
                res.status(200).send({ "state": "success", "data": result, "appUID": uid });
            }
        }
    };

    static sendState(res, err) {
        if (err) {
            this.sendError(res, err);
        } else {
            this.sendSuccessMessage(res);
        }
    };

    static sendData(res, err, result) {
        if (err) {
            this.sendError(res, err);
        } else {
            res.status(200).send(result);
        }
    };

    static sendSuccessMessage(res) {
        res.status(200).send({ state: 'success' });
    };

    static sendErrorWithUID(res, err, uid) {
        res.status(500).send({ state: 'failed', error: err.message, appUID: uid });
    };

    static sendError(res, err) {
        res.status(500).send({ state: 'failed', error: err.message});
    };

    static sendErrorMessage(res, errorMessage) {
        res.status(250).send({ state: 'failed', message: errorMessage });
    };

    static sendErrorMessageWithUID(res, errorMessage, uid) {
        res.status(250).send({ state: 'failed', message: errorMessage, appUID: uid });
    };

    static sendUnauthoriesedError(res) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    }

    static isSndProject() {
        return process.env.IS_SND_PROJECT === 'true';
    }
}

module.exports = ResponseHelper;
