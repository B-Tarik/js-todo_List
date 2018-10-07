const helper = {};

helper.ready = function(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

helper.handelErrors = function (request) {
    if(!request.ok) {
      throw ERROR(request.status);
    }
    return request;
}

helper.parseJSON = function (response) {
    return response.json()
}

helper.printError = function (err) {
    console.log('Error: ' + err);
}

export default helper;