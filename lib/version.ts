import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

export function getGitCommitHash(): string {
    try {
        return execSync('git rev-parse --short HEAD')
            .toString()
            .trim();
    } catch (error) {
        console.error('Failed to get git commit hash:', error);
        return 'unknown';
    }
}

export function getVersion(): string {
    try {
        const packageJsonPath = join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        return packageJson.version || 'unknown';
    } catch (error) {
        console.error('Failed to read version from package.json:', error);
        return 'unknown';
    }
}
