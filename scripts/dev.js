const { spawn } = require('child_process');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

const procs = [
  spawn(npmCmd, ['run', 'dev', '--prefix', 'ecoleaders/backend'], { stdio: 'inherit' }),
  spawn(npmCmd, ['run', 'dev', '--prefix', 'ecoleaders/frontend'], { stdio: 'inherit' }),
];

process.on('SIGINT', () => {
  procs.forEach((p) => p.kill('SIGINT'));
  process.exit();
});
