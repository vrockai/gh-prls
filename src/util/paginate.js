const github = require('../util/github')();

async function paginate (method, args = {per_page: 100}) {
    let response = await method(args);
    let { data } = response;
    while (github.hasNextPage(response)) {
        response = await github.getNextPage(response);
        data = data.concat(response.data)
    }

    return data
}

module.exports = paginate;