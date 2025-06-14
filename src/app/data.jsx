import { getCollection } from "@/lib/actions";

export default async function User() {
  const usersCollection = await getCollection("users");
  const user = await usersCollection.find().toArray();
  return <p>{user.name}</p>;
}
