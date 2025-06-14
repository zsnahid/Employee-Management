"use server";
import clientPromise from "@/lib/mongodb";
import { Document } from "mongodb";

export async function getCollection<Type extends Document = Document>(
  collectionName: string,
  dbName = "employee_management",
) {
  try {
    const client = await clientPromise;
    return client.db(dbName).collection<Type>(collectionName);
  } catch (e) {
    console.error(e);
  }
}

export async function createUser(formData: FormData) {
  console.log(formData);
}
