module.exports = rawRequest => {
  const request = rawRequest.toString().split('\n');
  const stringRequest = request.toString().split(' ');
  const body = rawRequest.toString().split('\r\n\r\n')[1];

  const method = stringRequest[0];
  const path = stringRequest[1];
  return { method, path, body }; 
};

