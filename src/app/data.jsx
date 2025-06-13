import { getCollection } from "@/lib/db";

export default async function User() {
  const usersCollection = await getCollection("customers");
  const query = { username: "fmiller" };
  const user = await usersCollection.findOne(query);
  return <p>{user.name}</p>;
}
