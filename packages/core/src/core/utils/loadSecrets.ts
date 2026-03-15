import fs from "fs";

/**
 * Load a secret from a file or environment variable
 * Use this function to load Docker mounts
 *  @param envVarName - The name of the environment variable that holds the secret path or value
 * @returns The secret value as a string
 */
export const loadSecret = (envVarName: string): string => {
  const secretPath = process.env[envVarName];

  if (!secretPath) {
    return "";
  }

  // Check if it's a file path (Docker secret)
  if (secretPath.startsWith("/run/secrets/")) {
    try {
      return fs.readFileSync(secretPath, "utf8").trim();
    } catch (error) {
      console.error(`Failed to read secret from ${secretPath}:`, error);
      return "";
    }
  }

  // Otherwise, it's a direct value (for local development)
  return secretPath;
};
