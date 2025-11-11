#!/usr/bin/env node
/**
 * Updates all package versions in the monorepo to match the release tag
 * Also updates inter-workspace dependencies
 */

import fs from "fs";
import path from "path";

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

interface PackageJson {
	name?: string;
	version?: string;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
}

function readPackageJson(filePath: string): PackageJson {
	const content = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(content);
}

function writePackageJson(filePath: string, pkg: PackageJson): void {
	const content = JSON.stringify(pkg, null, "\t") + "\n";
	fs.writeFileSync(filePath, content, "utf-8");
}

const workspacePackages = [
	"package.json",
	"packages/eslint-config-ts/package.json",
	"packages/eslint-config-react/package.json",
	"packages/test-utils/package.json",
];

console.log(`Updating all packages to version ${version}...\n`);

// Step 1: Update all package versions
for (const pkgPath of workspacePackages) {
	const fullPath = path.resolve(pkgPath);
	if (!fs.existsSync(fullPath)) {
		console.warn(`Warning: ${pkgPath} not found, skipping`);
		continue;
	}

	const pkg = readPackageJson(fullPath);

	// Skip test-utils if it has its own versioning
	if (pkg.name === "@caspeco/test-utils") {
		console.log(`✓ ${pkgPath} - keeping version ${pkg.version} (utility package)`);
		continue;
	}

	const oldVersion = pkg.version;
	pkg.version = version;
	writePackageJson(fullPath, pkg);

	console.log(`✓ ${pkgPath} - ${oldVersion} → ${version}`);
}

// Step 2: Update inter-workspace dependencies
console.log("\nUpdating inter-workspace dependencies...\n");

const reactPkgPath = "packages/eslint-config-react/package.json";
const reactPkg = readPackageJson(reactPkgPath);

if (reactPkg.dependencies?.["@caspeco/eslint-config-ts"]) {
	const oldDep = reactPkg.dependencies["@caspeco/eslint-config-ts"];
	reactPkg.dependencies["@caspeco/eslint-config-ts"] = version;
	writePackageJson(reactPkgPath, reactPkg);
	console.log(`✓ eslint-config-react dependency: ${oldDep} → ${version}`);
}

console.log("\n✅ All versions updated successfully!");
console.log("\nNext steps:");
console.log("  1. Review changes: git diff");
console.log("  2. Commit: git add . && git commit -m 'chore: release " + version + "'");
console.log("  3. Create GitHub release with tag: " + version);
