<script lang="ts">
	import { createTable } from '@tanstack/svelte-table';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	// Define our data type
	type Person = {
		id: number;
		name: string;
		email: string;
		role: string;
	};

	// Define our column helpers
	type TableMeta = {
		entity: 'person';
	};

	// Use $state for reactive data
	const people = $state<Person[]>([
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer' },
		{ id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Designer' }
	]);

	// Define sorting state
	const sorting = $state<{ id: string; desc: boolean }[]>([]);

	// Create table instance
	const table = createTable<Person, TableMeta>({
		get data() {
			return people;
		},
		columns: [
			{
				id: 'id',
				header: 'ID',
				accessorFn: (row) => row.id,
				cell: (info) => info.getValue()
			},
			{
				id: 'name',
				header: 'Name',
				accessorFn: (row) => row.name,
				cell: (info) => info.getValue()
			},
			{
				id: 'email',
				header: 'Email',
				accessorFn: (row) => row.email,
				cell: (info) => info.getValue()
			},
			{
				id: 'role',
				header: 'Role',
				accessorFn: (row) => row.role,
				cell: (info) => info.getValue()
			}
		],
		state: {
			get sorting() {
				return sorting;
			}
		},
		onSortingChange: (updaterOrValue) => {
			if (typeof updaterOrValue === 'function') {
				sorting = updaterOrValue(sorting);
			} else {
				sorting = updaterOrValue;
			}
		},
		getSortedRowModel: () => {},
		meta: {
			entity: 'person'
		}
	});

	// Derive table objects
	const $derived = {
		headerGroups: table.getHeaderGroups(),
		rowModel: table.getRowModel()
	};
</script>

<div class="container py-10">
	<h1 class="mb-4 text-2xl font-bold">Sortable Table Example</h1>

	<Table>
		<TableHeader>
			{#each $derived.headerGroups as headerGroup}
				<TableRow>
					{#each headerGroup.headers as header}
						<TableHead>
							{#if !header.isPlaceholder}
								<Button
									variant="ghost"
									onclick={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
									class="flex items-center gap-1"
								>
									{header.column.columnDef.header}
									{#if header.column.getIsSorted() === 'asc'}
										<ChevronUp class="h-4 w-4" />
									{:else if header.column.getIsSorted() === 'desc'}
										<ChevronDown class="h-4 w-4" />
									{/if}
								</Button>
							{:else}
								{header.column.columnDef.header}
							{/if}
						</TableHead>
					{/each}
				</TableRow>
			{/each}
		</TableHeader>
		<TableBody>
			{#each $derived.rowModel.rows as row}
				<TableRow>
					{#each row.getVisibleCells() as cell}
						<TableCell>
							{cell.getValue()}
						</TableCell>
					{/each}
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
