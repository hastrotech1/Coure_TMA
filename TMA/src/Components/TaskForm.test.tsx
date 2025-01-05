import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";
import { Task } from "../types/Tasks";

describe("TaskForm", () => {
  const mockOnAddTask = jest.fn();
  const validTask: Omit<Task, "id"> = {
    title: "Test Task",
    description: "Test Description",
    dueDate: "2025-01-20",
    priority: "Medium",
    status: "In Progress",
  };

  beforeEach(() => {
    mockOnAddTask.mockClear();
    // Mock Date.now() to return a consistent value
    jest.spyOn(Date, "now").mockImplementation(() => 1234567890);
  });

  test("renders all form fields correctly", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    // Check if all form elements are present
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  test("submit button is disabled when required fields are empty", () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const submitButton = screen.getByRole("button", { name: /add task/i });
    expect(submitButton).toBeDisabled();
  });

  test("submit button is enabled when required fields are filled", async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const dueDateInput = screen.getByLabelText(/due date/i);
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(titleInput, "Test Task");
    await userEvent.type(dueDateInput, "2025-01-20");

    expect(submitButton).toBeEnabled();
  });

  test("form submission with valid data", async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/title/i), validTask.title);
    await userEvent.type(
      screen.getByLabelText(/description/i),
      validTask.description
    );
    await userEvent.type(screen.getByLabelText(/due date/i), validTask.dueDate);
    await userEvent.selectOptions(
      screen.getByLabelText(/priority/i),
      validTask.priority
    );
    await userEvent.selectOptions(
      screen.getByLabelText(/status/i),
      validTask.status
    );

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Check if onAddTask was called with correct data
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    expect(mockOnAddTask).toHaveBeenCalledWith({
      ...validTask,
      id: "1234567890",
    });
  });

  test("form resets after successful submission", async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/title/i), validTask.title);
    await userEvent.type(
      screen.getByLabelText(/description/i),
      validTask.description
    );
    await userEvent.type(screen.getByLabelText(/due date/i), validTask.dueDate);

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Check if form fields are reset
    expect(screen.getByLabelText(/title/i)).toHaveValue("");
    expect(screen.getByLabelText(/description/i)).toHaveValue("");
    expect(screen.getByLabelText(/due date/i)).toHaveValue("");
    expect(screen.getByLabelText(/priority/i)).toHaveValue("Low");
    expect(screen.getByLabelText(/status/i)).toHaveValue("Pending");
  });

  test("shows alert when submitting without required fields", async () => {
    // const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    // render(<TaskForm onAddTask={mockOnAddTask} />);

    // // Try to submit without required fields
    // await userEvent.click(screen.getByRole("button", { name: /add task/i }));

    // expect(alertMock).toHaveBeenCalledWith(
    //   "Please fill in all required fields."
    // );
    // expect(mockOnAddTask).not.toHaveBeenCalled();

    // alertMock.mockRestore();
    let alertMock: jest.SpyInstance;

    beforeEach(() => {
      // Mock the alert function
      alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
      // Restore the original alert function
      alertMock.mockRestore();
    });

    it("shows alert when submitting without required fields", async () => {
      const mockOnAddTask = jest.fn();

      render(<TaskForm onAddTask={mockOnAddTask} />);

      // Simulate form submission without filling required fields
      await userEvent.click(screen.getByRole("button", { name: /add task/i }));

      // Verify that the alert is called
      expect(alertMock).toHaveBeenCalledWith(
        "Please fill in all required fields."
      );
      expect(alertMock).toHaveBeenCalledTimes(1);

      // Ensure the addTask callback is not called
      expect(mockOnAddTask).not.toHaveBeenCalled();
    });
  });

  test("handles form field changes correctly", async () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    // Test each field update

    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, "New Task");
    expect(titleInput).toHaveValue("New Task");

    const descriptionInput = screen.getByLabelText(/description/i);
    await userEvent.type(descriptionInput, "New Description");
    expect(descriptionInput).toHaveValue("New Description");

    const prioritySelect = screen.getByLabelText(/priority/i);
    await userEvent.selectOptions(prioritySelect, "High");
    expect(prioritySelect).toHaveValue("High");

    const statusSelect = screen.getByLabelText(/status/i);
    await userEvent.selectOptions(statusSelect, "Completed");
    expect(statusSelect).toHaveValue("Completed");
  });
});