#!/usr/bin/env node

/**
 * Migration script for renaming caspeco plugin to caspeco-react
 *
 * This script updates:
 * - Rule names: caspeco/discourage-chakra-import → caspeco-react/discourage-chakra-import
 * - ESLint disable comments
 * - ESLint config files
 *
 * Usage:
 *   npx caspeco-react-migrate-v5 [path] [--dry-run]
 *
 * Examples:
 *   npx caspeco-react-migrate-v5 src/
 *   npx caspeco-react-migrate-v5 . --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const targetPath = args.find((arg) => !arg.startsWith("--")) || ".";

// Patterns to search and replace
const replacements = [
	{
		pattern: /caspeco\/discourage-chakra-import/g,
		replacement: "caspeco-react/discourage-chakra-import",
		description: "Rule name",
	},
];

// File extensions to process
const extensions = [".js", ".jsx", ".ts", ".tsx", ".json", ".md"];

let filesProcessed = 0;
let filesChanged = 0;
let totalReplacements = 0;

/**
 * Recursively process directory
 */
function processDirectory(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		// Skip node_modules, .git, dist, build directories
		if (entry.isDirectory()) {
			if (["node_modules", ".git", "dist", "build", "coverage"].includes(entry.name)) {
				continue;
			}
			processDirectory(fullPath);
		} else {
			const ext = path.extname(entry.name);
			if (extensions.includes(ext)) {
				processFile(fullPath);
			}
		}
	}
}

/**
 * Process a single file
 */
function processFile(filePath) {
	filesProcessed++;

	let content;
	try {
		content = fs.readFileSync(filePath, "utf8");
	} catch (err) {
		console.error(`Error reading ${filePath}:`, err.message);
		return;
	}

	let newContent = content;
	let fileReplacements = 0;

	// Apply all replacement patterns
	for (const { pattern, replacement } of replacements) {
		const matches = newContent.match(pattern);
		if (matches) {
			fileReplacements += matches.length;
			newContent = newContent.replace(pattern, replacement);
		}
	}

	// If changes were made
	if (fileReplacements > 0) {
		filesChanged++;
		totalReplacements += fileReplacements;

		const relativePath = path.relative(process.cwd(), filePath);
		console.log(
			`${isDryRun ? "[DRY RUN] " : ""}✓ ${relativePath} (${fileReplacements} replacement${fileReplacements > 1 ? "s" : ""})`,
		);

		if (!isDryRun) {
			try {
				fs.writeFileSync(filePath, newContent, "utf8");
			} catch (err) {
				console.error(`Error writing ${filePath}:`, err.message);
			}
		}
	}
}

/**
 * Main execution
 */
function main() {
	console.log("Caspeco Plugin Migration Tool");
	console.log("==============================\n");

	if (isDryRun) {
		console.log("🔍 Running in DRY RUN mode - no files will be modified\n");
	}

	const resolvedPath = path.resolve(targetPath);

	if (!fs.existsSync(resolvedPath)) {
		console.error(`Error: Path "${targetPath}" does not exist`);
		process.exit(1);
	}

	console.log(`Scanning: ${resolvedPath}\n`);

	const stat = fs.statSync(resolvedPath);
	if (stat.isDirectory()) {
		processDirectory(resolvedPath);
	} else {
		processFile(resolvedPath);
	}

	console.log("\nSummary:");
	console.log("========");
	console.log(`Files scanned: ${filesProcessed}`);
	console.log(`Files with changes: ${filesChanged}`);
	console.log(`Total replacements: ${totalReplacements}`);

	if (isDryRun && filesChanged > 0) {
		console.log("\n💡 Run without --dry-run to apply changes");
	} else if (filesChanged > 0) {
		console.log("\n✅ Migration complete!");
	} else {
		console.log("\n✨ No files needed migration");
	}
}

main();
