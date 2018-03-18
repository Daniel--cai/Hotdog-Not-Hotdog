type jsobject = {. "message": string};
type eventobject = {. "body": string};

[@bs.scope "JSON"] [@bs.val] external stringify : jsobject => string = "stringify";

let receiveSms = (event, _context, callback) => {
  let body = {
    "message" : "Hello from Reasosdfsdf!"
  };

  let response = {
    "statusCode": 200,
    "body": stringify(body)
  };

   let xml = {body: "ehllosfds"};
   Js.log(xml.body);
   
  
      /* console.log(event)
  
  
      console.log("sending message", message)
  
      var initState = {
        "Comment": message
      } */
  
  [@bs] callback(Js.Nullable.null, response);
};