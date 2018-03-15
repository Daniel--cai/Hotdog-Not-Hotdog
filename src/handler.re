type jsobject = {. "message": string};
[@bs.scope "JSON"] [@bs.val] external stringify : jsobject => string = "stringify";

let hello = (_event, _context, callback) => {
  let body = {
    "message" : "Hello from Reason!"
  };

  let response = {
    "statusCode": 200,
    "body": stringify(body)
  };

  [@bs] callback(Js.Nullable.null, response);
};