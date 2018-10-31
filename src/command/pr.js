require('console.table');
const github = require('../util/github')();
const chalk = require('chalk');

async function githubPrList(args) {

    const loggedInUser = await github.users.get({})
        .then(dto => dto.data.login);

    return github.repos.getForOrg({org: args.owner, type: 'sources'})
        .then(getOrgRepos)
        .then(getAllReposPRs)
        .then(generatePrTable)
        .then(console.table);

    ////////////

    function getOrgRepos(orgDto) {
        return orgDto.data.map(repository => repository.name);
    }

    function getAllReposPRs(repositories) {
        const allPRs = repositories.map(repository => {
            return github.pullRequests.getAll({
                state: 'open',
                owner: args.owner,
                repo: repository
            });
        });

        return Promise.all(allPRs);
    }

    function generatePrTable(allReposPrs) {
        return allReposPrs
            .map(repoPrs => repoPrs.data)
            .reduce((prList, prSublist) => prList.concat(prSublist), [])
            .reduce((prTableData, pr) => {
                const {
                    _links,
                    title,
                    user: {login},
                } = pr;

                const reviewers = pr.requested_reviewers.map(reviewer => markCurrentUser(reviewer.login));

                prTableData.push({
                    Repo: `${pr.base.repo.name}`,
                    Author: `${markCurrentUser(login)}`,
                    Title: `${title}`,
                    Reviewers: `${reviewers}`,
                    URL: `${_links.html.href}`
                });

                return prTableData;
            }, []);
    }

    function markCurrentUser(user) {
        return user === loggedInUser ? chalk.red(user) : user;
    }
}

module.exports = githubPrList;