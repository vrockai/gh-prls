const yargs = require('yargs');
const commandPr = require('./command/pr');
const commandContributors = require('./command/contributors');

function main() {
    const args = yargs
        .usage('Usage: $0 <command> [options]')
        .option('owner')
        .command('pr',
            'List all PRs within an organization.',
            (yargs) => yargs
                .option('owner', {
                    alias: 'o',
                    describe: 'Organization name.'
                })
                .demandOption(['owner']),
            commandPr)
        .command('contributors',
            'List new contributors.',
            (yargs) => yargs
                .option('since', {
                    alias: 's',
                    describe: 'Date since when you want to list new contributors. By default, the first day of the ' +
                    'current month is used.',
                    default: getFirstDayOfMonth()
                })
                .option('owner', {
                    alias: 'o',
                    describe: 'Repository owner.'
                })
                .option('repository', {
                    alias: 'r',
                    describe: 'Repository name.'
                })
                .demandOption(['owner', 'repository']),
            commandContributors)
        .demandCommand(1, 'You need at least one command before moving on')
        .example('$0 pr --owner kiali')
        .help('help')
        .alias('help', 'h')
        .alias('version', 'v')
        .epilog('Set the GITHUB_TOKEN env variable for authenticated access. Check ' +
            'https://github.com/vrockai/gh-tools for more details.')
        .strict()
        .argv;

    ////////////

    function getFirstDayOfMonth() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth());
    }
}

module.exports = main;