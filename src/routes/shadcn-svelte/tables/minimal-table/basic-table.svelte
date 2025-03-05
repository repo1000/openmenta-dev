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

	// Define types
	type User = {
		id: number;
		name: string;
		email: string;
		role: string;
	};

	// Sample data
	const users = $state<User[]>([
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer' },
		{ id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Designer' }
	]);

	// Search filter state
	let searchInput = '';
	const filteredUsers = $derived(
		users.filter((user) => {
			const query = searchInput.toLowerCase();
			if (query.length === 0) return true;

			return (
				user.name.toLowerCase().includes(query) ||
				user.email.toLowerCase().includes(query) ||
				user.role.toLowerCase().includes(query) ||
				user.id.toString().includes(query)
			);
		})
	);

	// Column headers for display
	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role' }
	];
</script>

<div class="container py-10">
	<h1 class="mb-4 text-2xl font-bold">Basic Table Example</h1>

	<div class="mb-4">
		<Input bind:value={searchInput} placeholder="Search users..." class="max-w-sm" />
	</div>

	<div class="rounded-md border">
		<Table>
			<TableCaption>A list of users</TableCaption>
			<TableHeader>
				<TableRow>
					{#each columns as column}
						<TableHead>{column.label}</TableHead>
					{/each}
				</TableRow>
			</TableHeader>
			<TableBody>
				{#if filteredUsers.length === 0}
					<TableRow>
						<TableCell colspan={columns.length} class="text-center">No users found</TableCell>
					</TableRow>
				{:else}
					{#each filteredUsers as user (user.id)}
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
		Showing {filteredUsers.length} of {users.length} users
	</div>
</div>
