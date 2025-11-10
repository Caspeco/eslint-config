import fs from "fs";

interface PackageJson {
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
}

function readPackageJson(): PackageJson {
	const fileContent = fs.readFileSync("package.json", "utf-8");
	return JSON.parse(fileContent);
}

const packageJson: PackageJson = readPackageJson();
const packagesToVerify: string[] = process.argv.slice(2);

if (packagesToVerify.length === 0) {
	console.error("No packages provided");
	process.exit(1);
}

console.log("Packages to verify:", packagesToVerify);

let hasMismatch = false;

packagesToVerify.forEach((pkg) => {
	const devVersion = packageJson.devDependencies?.[pkg];
	const peerVersion = packageJson.peerDependencies?.[pkg];

	if (!devVersion) {
		console.error(`${pkg} not found in devDependencies`);
		hasMismatch = true;
		return;
	}

	if (!peerVersion) {
		console.error(`${pkg} not found in peerDependencies`);
		hasMismatch = true;
		return;
	}

	// Extract version from devDependencies (e.g., "7.0.1" from "7.0.1" or "^7.0.1")
	const devVersionClean = devVersion.replace(/^[\^~>=<]+/, "");

	// Check if peerDependency range is satisfied by devDependency version
	if (peerVersion.startsWith(">=")) {
		const peerMinVersion = peerVersion.replace(/^>=\s*/, "");
		const peerMajor = parseInt(peerMinVersion.split(".")[0]);
		const devMajor = parseInt(devVersionClean.split(".")[0]);

		if (devMajor < peerMajor) {
			console.error(
				`Version mismatch for ${pkg}: devDependencies (${devVersion}) does not satisfy peerDependencies (${peerVersion})`,
			);
			hasMismatch = true;
		}
	}
});

if (hasMismatch) {
	process.exit(1);
} else {
	console.log("All specified dependencies have consistent versions.");
}
