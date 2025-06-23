import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/actions";

// GET /api/employees/[id] - Fetch a single employee
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid employee ID" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "employee_management");

    const employee = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 },
      );
    }

    // Transform the data
    const transformedEmployee = {
      _id: employee._id.toString(),
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      email: employee.emailAddresses?.[0]?.emailAddress || employee.email || "",
      designation: employee.designation || "Not Specified",
      verified: employee.verified || false,
      bankAccount: employee.bankAccount
        ? `****${employee.bankAccount.slice(-4)}`
        : "Not Provided",
      salary: employee.salary || "Not Set",
      paymentStatus: employee.paymentStatus || "pending",
      avatar: employee.imageUrl || employee.avatar || null,
      createdAt: employee.createdAt || new Date().toISOString(),
      updatedAt: employee.updatedAt || new Date().toISOString(),
    };

    return NextResponse.json(transformedEmployee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json(
      { error: "Failed to fetch employee" },
      { status: 500 },
    );
  }
}

// PATCH /api/employees/[id] - Update employee verification status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid employee ID" },
        { status: 400 },
      );
    }

    const usersCollection = await getCollection("users");

    if (!usersCollection)
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );

    const { isVerified } = await request.json();

    // Validate that isVerified is a boolean
    if (typeof isVerified !== "boolean") {
      return NextResponse.json(
        { error: "isVerified must be a boolean value" },
        { status: 400 },
      );
    }

    // Update only the verification status
    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          isVerified,
          updatedAt: new Date().toISOString(),
        },
      },
      {
        returnDocument: "after",
        projection: { isVerified: 1 }, // Only return isVerified field
      },
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 },
      );
    }

    // Return only the verification status
    return NextResponse.json(
      {
        isVerified: result.value.isVerified,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating employee verification:", error);
    return NextResponse.json(
      { error: "Failed to update employee verification" },
      { status: 500 },
    );
  }
}

// DELETE /api/employees/[id] - Delete an employee
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid employee ID" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "employee_management");

    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 },
    );
  }
}
