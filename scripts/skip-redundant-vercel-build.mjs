// Vercel ignoreCommand: exit 0 = skip this build, exit 1 = proceed.
// Preview deploys and the duplicate nyanchu-news project burn the same credits twice.
const ref = process.env.VERCEL_GIT_COMMIT_REF;
const name = process.env.VERCEL_PROJECT_NAME ?? "";
const skip = ref !== "main" || name === "nyanchu-news";
process.exit(skip ? 0 : 1);
