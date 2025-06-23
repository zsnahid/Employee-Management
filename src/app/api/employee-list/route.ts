import { NextResponse } from "next/server";
import { getCollection } from "@/lib/actions";
import { Employee } from "@/store/employeeListApi";

// GET /api/employees - Fetch all employees
export async function GET() {
  try {
    const employeesCollection = await getCollection<Employee>("users");

    if (!employeesCollection)
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 },
      );

    // Fetch all users from the 'users' collection
    const employees = await employeesCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray(); // Sort by newest first

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 },
    );
  }
}

// POST /api/employees - Create a new employee
