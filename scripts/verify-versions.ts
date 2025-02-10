import fs from "fs";

interface PackageJson {
	devDependencies?: Record<string, string>;
	optionalDependencies?: Record<string, string>;
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
	const optionalVersion = packageJson.optionalDependencies?.[pkg];

	if (devVersion && optionalVersion && devVersion !== optionalVersion) {
		console.error(
			`Version mismatch for ${pkg}: devDependencies (${devVersion}) !== optionalDependencies (${optionalVersion})`,
		);
		hasMismatch = true;
	}
});

if (hasMismatch) {
	process.exit(1);
} else {
	console.log("All specified dependencies have consistent versions.");
}
