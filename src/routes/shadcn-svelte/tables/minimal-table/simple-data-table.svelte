<script lang="ts">
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	// Define types
	type User = {
		id: number;
		name: string;
		email: string;
		role: string;
	};

	type SortColumn = {
		column: keyof User;
		direction: 'asc' | 'desc';
	};

	// Sample data
	const users = $state<User[]>([
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer' },
		{ id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Designer' }
	]);

	// Search filter
	const searchQuery = $state('');

	// Sorting state
	const sortConfig = $state<SortColumn | null>(null);

	// Get filtered users
	const filteredUsers = $derived(
		users.filter((user) => {
			const query = searchQuery.toLowerCase();
			return (
				user.name.toLowerCase().includes(query) ||
				user.email.toLowerCase().includes(query) ||
				user.role.toLowerCase().includes(query) ||
				user.id.toString().includes(query)
			);
		})
	);

	// Get sorted users
	const sortedUsers = $derived(
		[...filteredUsers].sort((a, b) => {
			if (!sortConfig) return 0;

			const { column, direction } = sortConfig;
			const aValue = a[column];
			const bValue = b[column];

			if (direction === 'asc') {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		})
	);

	// Function to handle sort
	function handleSort(column: keyof User) {
		if (sortConfig && sortConfig.column === column) {
			if (sortConfig.direction === 'asc') {
				sortConfig = { column, direction: 'desc' };
			} else {
				sortConfig = null;
			}
		} else {
			sortConfig = { column, direction: 'asc' };
		}
	}

	// Function to handle search
	function handleSearch(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;
	}

	// Define column headers
	const columns: { key: keyof User; label: string }[] = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role' }
	];
</script>

<div class="container py-10">
	<h1 class="mb-4 text-2xl font-bold">Simple Data Table</h1>

	<div class="mb-4">
		<Input value={searchQuery} oninput={handleSearch} placeholder="Search..." class="max-w-sm" />
	</div>

	<div class="rounded-md border">
		<Table>
			<TableCaption>A list of users</TableCaption>
			<TableHeader>
				<TableRow>
					{#each columns as column}
						<TableHead>
							<Button
								variant="ghost"
								onclick={() => handleSort(column.key)}
								class="flex items-center gap-1 p-0 font-medium"
							>
								{column.label}
								{#if sortConfig && sortConfig.column === column.key}
									{#if sortConfig.direction === 'asc'}
										<ChevronUp class="h-4 w-4" />
									{:else}
										<ChevronDown class="h-4 w-4" />
									{/if}
								{/if}
							</Button>
						</TableHead>
					{/each}
				</TableRow>
			</TableHeader>
			<TableBody>
				{#if sortedUsers.length === 0}
					<TableRow>
						<TableCell colSpan={columns.length} class="text-center">No results found.</TableCell>
					</TableRow>
				{:else}
					{#each sortedUsers as user (user.id)}
						<TableRow>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
						</TableRow>
					{/each}
				{/if}
			</TableBody>
		</Table>
	</div>

	<div class="mt-4 text-sm text-muted-foreground">
		Showing {sortedUsers.length} of {users.length} entries
	</div>
</div>
