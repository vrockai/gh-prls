const GitHubApi = require("@octokit/rest");
const github = new GitHubApi();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function getGithubClient() {
    if (GITHUB_TOKEN) {
        github.authenticate({
            type: 'token',
            token: GITHUB_TOKEN
        });
    }

    return github;
}

module.exports = getGithubClient;