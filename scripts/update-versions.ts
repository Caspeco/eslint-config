#!/usr/bin/env node
/**
 * Updates all package versions in the monorepo to match the release tag
 * Also updates inter-workspace dependencies
 */

import { execFileSync } from "child_process";

const version = process.argv[2];

if (!version) {
	console.error("Usage: npm run update-versions <version>");
	console.error("Example: npm run update-versions 5.0.0");
	process.exit(1);
}

// Validate semver format
const semverPattern = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
if (!semverPattern.test(version)) {
	console.error(`Error: Invalid version format: ${version}`);
	console.error("Expected format: X.Y.Z or X.Y.Z-beta.N");
	process.exit(1);
}

function npm(args: string[]): void {
	execFileSync("npm", args, { stdio: "inherit", shell: true });
}

console.log(`Updating all packages to version ${version}...\n`);

// Step 1: Point eslint-config-react at the new eslint-config-ts version before
// bumping, so `npm version` below resolves it to the local workspace when it
// writes package-lock.json (no registry lookup, no separate lock resync).
npm([
	"pkg",
	"set",
	`dependencies.@caspeco/eslint-config-ts=${version}`,
	"--workspace=packages/eslint-config-react",
]);

// Step 2: Bump the root package and versioned workspaces via `npm version`.
// This keeps package.json and package-lock.json in sync in one step.
// test-utils is intentionally omitted - it has its own versioning.
npm([
	"version",
	version,
	"--workspace=packages/eslint-config-ts",
	"--workspace=packages/eslint-config-react",
	"--include-workspace-root",
	"--no-git-tag-version",
	"--allow-same-version",
]);

console.log("\n✅ All versions updated successfully!");
console.log("\nNext steps:");
console.log("  1. Review changes: git diff");
console.log("  2. Commit: git add . && git commit -m 'chore: release " + version + "'");
console.log("  3. Create GitHub release with tag: " + version);
