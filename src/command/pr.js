require('console.table');
const github = require('../util/github')();
const chalk = require('chalk');
const config = require('../util/config');
const paginate = require('../util/paginate');
const errorHandler = require('../util/errorHandler');

async function githubPrList(args) {

    const loggedInUser = await github.users.get({})
        .then(dto => dto.data.login);

    let repoList;
    try {
        repoList = await paginate(github.repos.getForOrg, {
            org: args.owner,
            type: 'sources',
            per_page: config.PER_PAGE,
        });
    } catch (e) {
        errorHandler(`Organization ${args.owner} not found.`);
    }

    const repoNameList = repoList.map(repository => repository.name);


    let prList;
    try {
        prList = await getAllReposPRs(repoNameList);
    } catch (e) {
        errorHandler(`Error while accession ${args.owner} repositories.`);
    }

    const prTable = generatePrTable(prList);

    return console.table(prTable);

    ////////////

    async function getAllReposPRs(repos) {
        return Promise.all(repos.map(repo => paginate(github.pullRequests.getAll, {
            state: 'open',
            owner: args.owner,
            repo: repo,
            per_page: config.PER_PAGE,
        })));
    }

    function generatePrTable(allReposPrs) {
        return allReposPrs
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