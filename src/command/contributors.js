require('console.table');
const _ = require('lodash');
const github = require('../util/github')();

async function contributors(args) {
    const PER_PAGE = 100;
    const SINCE_DATE = new Date(args.since);

    const users = await getLastMonthsUsers();
    const userCommits = _.map(users, getUserCommits);

    const filterUnique = list => _.filter(list, {isUniq: true});
    const preprocessTable = (list) => _.map(list, (user) => {
        return {Login: user.author.login, Username: user.author.name, Url: user.author.url, Date: user.date}
    });

    Promise.all(userCommits)
        .then(filterUnique)
        .then(preprocessTable)
        .then(console.table);

    ////////////

    function getUsers(dto) {
        return _(dto.data)
            .map('author.login')
            .uniq()
            .value();
    }

    function getLastMonthsUsers() {
        return github.repos.getCommits({owner: args.owner, repo: args.repository, per_page: PER_PAGE, since: args.since})
            .then(getUsers);
    }

    function getUserCommits(author) {
        return github.repos.getCommits({owner: args.owner, repo: args.repository, per_page: PER_PAGE, author: author})
            .then((dto) => {
                const lastCommit = _.last(dto.data);
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
                    isUniq: lastDate ? SINCE_DATE <= lastCommitDate : false};
            });
    }
}

module.exports = contributors;