import clientPromise from "@/lib/mongodb";

export async function getCollection(
  collectionName: string,
  dbName = "sample_analytics",
) {
  try {
    const client = await clientPromise;
    return client.db(dbName).collection(collectionName);
  } catch (e) {
    console.error(e);
  }
}
