require('console.table');
const github = require('../util/github')();

function githubPrList(args) {

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

                const reviewers = pr.requested_reviewers.map(reviewer => reviewer.login);

                prTableData.push({
                    Repo: `${pr.base.repo.name}`,
                    Author: `${login}`,
                    Title: `${title}`,
                    Reviewers: `${reviewers}`,
                    URL: `${_links.html.href}`
                });

                return prTableData;
            }, []);
    }
}

module.exports = githubPrList;