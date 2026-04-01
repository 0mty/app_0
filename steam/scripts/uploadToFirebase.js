import {
  uploadCategories,
  uploadGames,
} from "./uploadGamedataToFirestore.js";

async function runUpload() {
  try {
    console.log("Starting upload...");
    await uploadCategories();
    await uploadGames();
    console.log("✅ All data uploaded successfully!");
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
}

runUpload();
