require('console.table');
const _ = require('lodash');
const config = require('../util/config');
const github = require('../util/github')();
const paginate = require('../util/paginate');
const errorHandler = require('../util/errorHandler');

// New contributor is a contributor who has commits after the "since" date, but doesn't have commits until the "since"
// date.
async function contributors(args) {
    if (!Date.parse(args.since)) {
        errorHandler(`Invalid date format: ${args.since}`);
    }

    const SINCE_DATE = new Date(args.since);

    // Get repo names by either:
    // 1. Use the repo specified by the `--repo` argument.
    // 2. Fetch all the repos from the organization specified by the `--owner` argument.
    let _repoNames = await getRepoNames(args, github);

    // Get all commits across all repos since the specified date.
    const allCommitsSince = await Promise.all(_.map(_repoNames, getLastMonthsCommits)).then(_.flatten);

    return Promise.all(allCommitsSince)
    // Extract all authors from the commit list.
        .then(getAuthors)
        .then(_.flatten)
        // Check if authors have older commits.
        .then(haveOlderCommits)
        // Filter authors with older commits.
        .then(author => _.filter(author, {isNewContributor: true}))
        // Combine the author data with commit data for the resulting table.
        .then(_.curry(processTable)(allCommitsSince))
        .then(console.table);

    ////////////

    function processTable(allCommitsSince, authorList) {
        return _.map(authorList, (author) => {

            const _isCurrentAuthor = commit => commit.author.login === author.login;
            const _getCommiterDate = commit => new Date(commit.committer.date);

            const lastCommitByAuthor = _(allCommitsSince)
                .filter(_isCurrentAuthor)
                .sortBy(_getCommiterDate)
                .last();

            const contributionDate = new Date(lastCommitByAuthor.commit.committer.date).toLocaleDateString();

            return {
                Login: author.login,
                Url: author.url,
                'Contributor Since': contributionDate,
                'Commit': lastCommitByAuthor.url
            }
        });
    }

    function haveOlderCommits(userList) {
        // Compute the 'isNewContributor' value for each user.
        const extendedUserList = _.map(userList, fetchCommitsBeforeSince);

        return Promise.all(extendedUserList);

        ////////////

        function fetchCommitsBeforeSince(user) {
            // Find if user has commits before since in each repo.
            const _hasCommitsBeforeSince = _.map(_repoNames, hasCommitsBeforeSince);

            return Promise.all(_hasCommitsBeforeSince)
            // Add the 'isNewContributor' field based on the existence of commits before since.
                .then(extendUserDto);

            ////////////

            function extendUserDto(commitsBeforeSince) {
                return {
                    ...user,
                    isNewContributor: _.every(commitsBeforeSince, commitBeforeSince => commitBeforeSince === true)
                }
            }

            function hasCommitsBeforeSince(repo) {
                const _isCommitListEmpty = (dto) => !dto.data.length;

                try {
                    return github.repos.getCommits({
                        author: user.login,
                        owner: args.owner,
                        repo: repo,
                        per_page: config.PER_PAGE,
                        until: SINCE_DATE
                    }).then(_isCommitListEmpty, () => true);
                } catch (e) {
                    errorHandler(`Error fetching commits in ${args.owner}/${repo} for ${user.login}`);
                }
            }
        }
    }

    async function getRepoNames(args, github) {
        if (args.repo) {
            return [args.repo];
        }

        let repos;
        try {
            repos = await paginate(github.repos.getForOrg, {
                org: args.owner,
                type: 'sources',
                per_page: config.PER_PAGE,
            });
        } catch (e) {
            errorHandler(`Error fetching repositories in ${args.owner}`);
        }

        return _.map(repos, 'name');
    }

    function getAuthors(commitList) {
        return _(commitList)
            .uniqBy('author.login')
            .map('author')
            .value();
    }

    async function getLastMonthsCommits(repo) {
        try {
            return await paginate(github.repos.getCommits, {
                owner: args.owner,
                repo: repo,
                per_page: config.PER_PAGE,
                since: SINCE_DATE
            });
        } catch (e) {
            console.log(e);
            errorHandler(`1 Error fetching commits in ${args.owner}/${repo}`);
        }
    }
}

module.exports = contributors;