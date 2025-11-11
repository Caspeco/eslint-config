import fs from "fs";
import path from "path";

interface PackageJson {
	name?: string;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
}

function readPackageJson(filePath: string): PackageJson {
	const fileContent = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(fileContent);
}

// Read root package.json for devDependencies
const rootPackageJson: PackageJson = readPackageJson("package.json");

// Find all workspace packages
const packagesDir = "packages";
const workspacePackages = fs.readdirSync(packagesDir).filter((dir) => {
	const pkgPath = path.join(packagesDir, dir, "package.json");
	return fs.existsSync(pkgPath);
});

console.log("Verifying versions for workspace packages:", workspacePackages);

let hasMismatch = false;

workspacePackages.forEach((workspacePkg) => {
	const pkgJsonPath = path.join(packagesDir, workspacePkg, "package.json");
	const packageJson = readPackageJson(pkgJsonPath);

	console.log(`\nChecking ${packageJson.name}...`);

	if (!packageJson.peerDependencies) {
		console.log("  No peerDependencies to verify");
		return;
	}

	Object.entries(packageJson.peerDependencies).forEach(([pkg, peerVersion]) => {
		const devVersion = rootPackageJson.devDependencies?.[pkg];

		if (!devVersion) {
			console.error(`  ❌ ${pkg} not found in root devDependencies`);
			hasMismatch = true;
			return;
		}

		// Extract major version from devDependencies
		const devVersionClean = devVersion.replace(/^[\^~>=<]+/, "");
		const devMajor = parseInt(devVersionClean.split(".")[0]);

		// Check if peerDependency range is satisfied
		if (peerVersion.startsWith(">=")) {
			const peerMinVersion = peerVersion.replace(/^>=\s*/, "");
			const peerMajor = parseInt(peerMinVersion.split(".")[0]);

			if (devMajor < peerMajor) {
				console.error(
					`  ❌ Version mismatch for ${pkg}: root devDependencies (${devVersion}) does not satisfy peerDependencies (${peerVersion})`,
				);
				hasMismatch = true;
			} else {
				console.log(`  ✓ ${pkg}: ${devVersion} satisfies ${peerVersion}`);
			}
		} else {
			console.log(`  ✓ ${pkg}: ${devVersion} (peer: ${peerVersion})`);
		}
	});
});

if (hasMismatch) {
	console.error("\n❌ Version verification failed");
	process.exit(1);
} else {
	console.log("\n✓ All workspace dependencies have consistent versions.");
}
