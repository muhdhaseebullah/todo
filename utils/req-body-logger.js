log = function (functionName, dataBody) {

    console.log("");
    console.log("=============" + functionName + " [START] ==================");
    console.log(JSON.stringify(dataBody, null, 4));
    console.log("");
};

endlog = function (functionName) {

    console.log("");
    console.log("=============" + functionName + " [END] ==================");
    console.log("");
};


module.exports = {
    log: log,
    endlog: endlog
};
