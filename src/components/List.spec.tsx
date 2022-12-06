import {
  render,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("List Component", () => {
  it("should render items list", async () => {
    const { getByText, rerender, queryByText, debug } = render(
      <List initialItems={["Neymar", "Daniel", "Marquinhos"]} />
    );
    
    expect(getByText("Neymar")).toBeInTheDocument();
    expect(getByText("Daniel")).toBeInTheDocument();
    expect(getByText("Marquinhos")).toBeInTheDocument();

    rerender(<></>);
    rerender(<List initialItems={['Julia']} />)
      
    expect(getByText("Julia")).toBeInTheDocument();
    expect(queryByText("Marquinhos")).not.toBeInTheDocument();
  });

  it("should be able to add a new item to the list", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    await userEvent.type(inputElement, "Novo");
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("Novo")).toBeInTheDocument();
    });
  });

  it("should be able to remove an new item from the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialItems={["Neymar"]} />
    );

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Neymar")).not.toBeInTheDocument();
    });
  });
});
