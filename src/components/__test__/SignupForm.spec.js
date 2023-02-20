import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SignupForm from "../SignupForm";

test("renders the form", () => {
  const { getByRole, getByLabelText } = render(<SignupForm />);

  const nameInput = getByLabelText("Name");
  expect(nameInput).toBeInTheDocument();

  const emailInput = getByLabelText("Email");
  expect(emailInput).toBeInTheDocument();

  const passwordInput = getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();

  const occupationSelect = getByLabelText("Occupation");
  expect(occupationSelect).toBeInTheDocument();

  const stateSelect = getByLabelText("State");
  expect(stateSelect).toBeInTheDocument();

  const submitButton = getByRole("button", { name: "Sign up" });
  expect(submitButton).toBeInTheDocument();
});

test("displays an error message if name is not formatted correctly", () => {
  const { getByText, getByLabelText, getByRole } = render(<SignupForm />);

  const nameInput = getByLabelText("Name");
  fireEvent.change(nameInput, { target: { value: "FirstLast" } });

  const submitButton = getByRole("button", { name: "Sign up" });
  fireEvent.click(submitButton);

  const errorMsg = getByText("Name must contain first name and last name.");
  expect(errorMsg).toBeInTheDocument();
});
