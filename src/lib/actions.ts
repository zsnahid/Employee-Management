"use server";
import clientPromise from "@/lib/mongodb";
import { Document } from "mongodb";
import { User } from "./definitions";

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
  try {
    const usersCollection = await getCollection<User>("users");

    const userName = formData.get("userName") as string;
    const role = formData.get("role") as string;
    const designation = formData.get("designation") as string;
    const salaryString = formData.get("salary") as string;
    const bank_account_no = formData.get("bank_account_no") as string;
    const address = formData.get("address") as string;

    // Validate required fields
    if (
      !userName ||
      !role ||
      !designation ||
      !salaryString ||
      !bank_account_no ||
      !address
    ) {
      throw new Error("All fields are required");
    }

    // Convert salary to number
    const salary = parseFloat(salaryString);
    if (isNaN(salary)) {
      throw new Error("Invalid salary format");
    }

    const user: Omit<User, "_id"> = {
      userName,
      role,
      designation,
      salary,
      bank_account_no,
      address,
    };

    const res = await usersCollection?.insertOne(user);

    if (!res?.insertedId) {
      throw new Error("Failed to insert into database");
    }

    return { success: true, insertedId: res.insertedId.toString() };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
