require('console.table');
const _ = require('lodash');
const config = require('../util/config');
const github = require('../util/github')();
const paginate = require('../util/paginate');

async function contributors(args) {
    const SINCE_DATE = new Date(args.since);

    const users = await getLastMonthsUsers();
    const userCommits = _.map(users, getUserCommits);

    const filterUnique = list => _.filter(list, {isRecent: true});
    const preprocessTable = (list) => _.map(list, (user) => {
        return {
            Login: user.author.login,
            Username: user.author.name,
            Url: user.author.url,
            Date: user.date
        }
    });

    Promise.all(userCommits)
        .then(filterUnique)
        .then(preprocessTable)
        .then(console.table);

    ////////////

    function getUsers(userList) {
        return _(userList)
            .map('author.login')
            .uniq()
            .value();
    }

    async function getLastMonthsUsers() {
        const userList = await paginate(github.repos.getCommits, {
            owner: args.owner,
            repo: args.repository,
            per_page: config.PER_PAGE,
            since: args.since
        });

        return getUsers(userList);
    }

    async function getUserCommits(author) {
        const commitList = await paginate(github.repos.getCommits, {
            owner: args.owner,
            repo: args.repository,
            per_page: config.PER_PAGE,
            author: author
        });

        const lastCommit = _.last(commitList);
        const authorDto = _.get(lastCommit, 'author');
        const authorCommitDto = _.get(lastCommit, 'commit.author');
        const lastDate = _.get(lastCommit, 'commit.author.date');
        const lastCommitDate = new Date(lastDate);

        return {
            author: {
                ...authorCommitDto,
                ...authorDto
            },
            date: lastDate,
            isRecent: lastDate ? SINCE_DATE <= lastCommitDate : false
        };
    }
}

module.exports = contributors;