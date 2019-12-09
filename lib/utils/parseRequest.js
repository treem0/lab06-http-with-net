module.exports = rawRequest => {
  const request = rawRequest.toString().split('/n');
  const stringRequest = request.toString().split(' ');
  const bodyRequest = rawRequest.toString().split(/\r?\n/);

  const method = stringRequest[0];
  const path = stringRequest[1];
  const body = bodyRequest[4];
  
  return { method, path, body }; 
};




// GET /dog HTTP/1.1
// Host: example.com
// Accept-Language: us-en
