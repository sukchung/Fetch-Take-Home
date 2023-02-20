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

  const emailInput = getByLabelText("Email");
  fireEvent.change(emailInput, { target: { value: "firstlast@test.com" } });

  const occupationSelect = getByLabelText("Occupation");
  fireEvent.change(occupationSelect, {
    target: { value: "Head of Shrubbery" },
  });

  const stateSelect = getByLabelText("State");
  fireEvent.change(stateSelect, { target: { value: "California" } });

  const passwordInput = getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "p@ssword" } });

  const submitButton = getByRole("button", { name: "Sign up" });
  fireEvent.click(submitButton);

  const errorMsg = getByText("Name must contain first name and last name.");
  expect(errorMsg).toBeInTheDocument();
});

test("displays an error message if password is not 8-20 characters long", () => {
  const { getByLabelText, getByRole, getByText } = render(<SignupForm />);

  const nameInput = getByLabelText("Name");
  fireEvent.change(nameInput, { target: { value: "First Last" } });

  const emailInput = getByLabelText("Email");
  fireEvent.change(emailInput, { target: { value: "firstlast@test.com" } });

  const occupationSelect = getByLabelText("Occupation");
  fireEvent.change(occupationSelect, {
    target: { value: "Head of Shrubbery" },
  });

  const stateSelect = getByLabelText("State");
  fireEvent.change(stateSelect, { target: { value: "California" } });

  const passwordInput = getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "pass" } });

  const submitButton = getByRole("button", { name: "Sign up" });
  fireEvent.click(submitButton);

  const errorMsg = getByText("Password must be 8 to 20 characters long.");
  expect(errorMsg).toBeInTheDocument();
});

test("displays an error message if password does not have at least one special character", () => {
  const { getByLabelText, getByRole, getByText } = render(<SignupForm />);

  const nameInput = getByLabelText("Name");
  fireEvent.change(nameInput, { target: { value: "First Last" } });

  const emailInput = getByLabelText("Email");
  fireEvent.change(emailInput, { target: { value: "firstlast@test.com" } });

  const occupationSelect = getByLabelText("Occupation");
  fireEvent.change(occupationSelect, {
    target: { value: "Head of Shrubbery" },
  });

  const stateSelect = getByLabelText("State");
  fireEvent.change(stateSelect, { target: { value: "California" } });

  const passwordInput = getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "password" } });

  const submitButton = getByRole("button", { name: "Sign up" });
  fireEvent.click(submitButton);

  const errorMsg = getByText(
    "Password must have at least one special character."
  );
  expect(errorMsg).toBeInTheDocument();
});
