const axios = require('axios');

(async function main() {
  const response = await axios.get(
    'https://api.github.com/users/thierrysantos/repos'
  );
  console.log(response.data);
})();
