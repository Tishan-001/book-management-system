import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Books from "@/components/books/books";
import { successfulAllBooksMock, erroredAllBooksMock } from "../__tests__/__mocks__/__quaries__/mock.book.query";

// Test for loading state
test("should show loading spinner when data is being fetched", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Books />
    </MockedProvider>
  );

  expect(screen.getByRole("progressbar")).toBeInTheDocument();
});

// Test for error state
test("should show error message when query fails", async () => {
  render(
    <MockedProvider mocks={erroredAllBooksMock} addTypename={false}>
      <Books />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });
});

// Test for successful data fetching
test("should render books when query is successful", async () => {
  render(
    <MockedProvider mocks={successfulAllBooksMock} addTypename={false}>
      <Books />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("Book One")).toBeInTheDocument();
  });
});
