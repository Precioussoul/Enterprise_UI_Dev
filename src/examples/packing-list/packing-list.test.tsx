import { render, screen, waitFor } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemAddButton = screen.getByRole('button', {
    name: 'Add New Item',
  });
  expect(newItemInput).toHaveValue('');
  expect(newItemAddButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemAddButton = screen.getByRole('button', {
    name: 'Add New Item',
  });

  await user.type(newItemInput, 'Macbook Pro');
  expect(newItemAddButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemAddButton = screen.getByRole('button', {
    name: 'Add New Item',
  });

  await user.type(newItemInput, 'Macbook Pro');
  await user.click(newItemAddButton);
  expect(screen.getByLabelText('Macbook Pro')).not.toBeChecked();
});

it('Remove an item from the list', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const newItemAddButton = screen.getByRole('button', {
    name: 'Add New Item',
  });

  await user.type(newItemInput, 'IPad Pro');
  await user.click(newItemAddButton);

  const removeItem = screen.getByLabelText(/remove/i);

  await user.click(removeItem);

  await waitFor(() => expect(removeItem).not.toBeInTheDocument());
});
