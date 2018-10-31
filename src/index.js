const yargs = require('yargs');
const commandPr = require('./command/pr');

function main() {
    const args = yargs
        .usage('Usage: $0 <command> [options]')
        .option('owner')
        .command('pr',
            'List PRs in an organization',
            (yargs) => yargs
                .option('owner', {
                    alias: 'o',
                    describe: 'Organization name'
                })
                .demandOption(['owner']),
            commandPr)
        .demandCommand(1, 'You need at least one command before moving on')
        .example('$0 pr --owner kiali')
        .help('help')
        .alias('help', 'h')
        .alias('version', 'v')
        .epilog(`Check ... for more details`)
        .strict()
        .argv;
}

module.exports = main;