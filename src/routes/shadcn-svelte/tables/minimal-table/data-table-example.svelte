<script lang="ts">
	import { createTable } from '@tanstack/svelte-table';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import {
		ChevronDown,
		ChevronUp,
		ChevronsLeft,
		ChevronsRight,
		ChevronLeft,
		ChevronRight
	} from 'lucide-svelte';

	// Define our data type
	type Person = {
		id: number;
		name: string;
		email: string;
		role: string;
	};

	// Use $state for reactive data
	const data = $state<Person[]>([
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer' },
		{ id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Designer' },
		{ id: 6, name: 'Eva Wilson', email: 'eva@example.com', role: 'Manager' },
		{ id: 7, name: 'Frank Miller', email: 'frank@example.com', role: 'Developer' },
		{ id: 8, name: 'Grace Lee', email: 'grace@example.com', role: 'Designer' },
		{ id: 9, name: 'Henry Taylor', email: 'henry@example.com', role: 'Manager' },
		{ id: 10, name: 'Ivy Clark', email: 'ivy@example.com', role: 'Developer' }
	]);

	// Define state variables
	const globalFilter = $state('');
	const columnFilters = $state([]);
	const sorting = $state([]);
	const pagination = $state({
		pageIndex: 0,
		pageSize: 5
	});
	const rowSelection = $state({});

	// Helper functions to update state
	function updateGlobalFilter(updaterOrValue) {
		if (typeof updaterOrValue === 'function') {
			const newValue = updaterOrValue(globalFilter);
			globalFilter = newValue;
		} else {
			globalFilter = updaterOrValue;
		}
	}

	function updateColumnFilters(updaterOrValue) {
		if (typeof updaterOrValue === 'function') {
			const newValue = updaterOrValue(columnFilters);
			columnFilters = newValue;
		} else {
			columnFilters = updaterOrValue;
		}
	}

	function updateSorting(updaterOrValue) {
		if (typeof updaterOrValue === 'function') {
			const newValue = updaterOrValue(sorting);
			sorting = newValue;
		} else {
			sorting = updaterOrValue;
		}
	}

	function updatePagination(updaterOrValue) {
		if (typeof updaterOrValue === 'function') {
			const newValue = updaterOrValue(pagination);
			pagination = newValue;
		} else {
			pagination = updaterOrValue;
		}
	}

	function updateRowSelection(updaterOrValue) {
		if (typeof updaterOrValue === 'function') {
			const newValue = updaterOrValue(rowSelection);
			rowSelection = newValue;
		} else {
			rowSelection = updaterOrValue;
		}
	}

	// Create table instance
	const table = createTable({
		get data() {
			return data;
		},
		columns: [
			{
				id: 'select',
				header: 'Select',
				cell: ({ row }) => row.getIsSelected(),
				enableSorting: false
			},
			{
				id: 'id',
				header: 'ID',
				accessorFn: (row) => row.id,
				cell: (info) => info.getValue(),
				enableSorting: true
			},
			{
				id: 'name',
				header: 'Name',
				accessorFn: (row) => row.name,
				cell: (info) => info.getValue(),
				enableSorting: true,
				enableGlobalFilter: true
			},
			{
				id: 'email',
				header: 'Email',
				accessorFn: (row) => row.email,
				cell: (info) => info.getValue(),
				enableSorting: true,
				enableGlobalFilter: true
			},
			{
				id: 'role',
				header: 'Role',
				accessorFn: (row) => row.role,
				cell: (info) => info.getValue(),
				enableSorting: true,
				enableGlobalFilter: true
			}
		],
		state: {
			get globalFilter() {
				return globalFilter;
			},
			get columnFilters() {
				return columnFilters;
			},
			get sorting() {
				return sorting;
			},
			get pagination() {
				return pagination;
			},
			get rowSelection() {
				return rowSelection;
			}
		},
		enableRowSelection: true,
		onGlobalFilterChange: updateGlobalFilter,
		onColumnFiltersChange: updateColumnFilters,
		onSortingChange: updateSorting,
		onPaginationChange: updatePagination,
		onRowSelectionChange: updateRowSelection,
		getCoreRowModel: () => {},
		getFilteredRowModel: () => {},
		getPaginationRowModel: () => {},
		getSortedRowModel: () => {}
	});

	// Helper to get pagination info
	const getPaginationInfo = () => {
		const { pageIndex, pageSize } = pagination;
		const pageCount = Math.ceil(data.length / pageSize);
		const firstItemIndex = pageIndex * pageSize;
		const lastItemIndex = Math.min(firstItemIndex + pageSize, data.length);

		return {
			pageCount,
			firstItemIndex: firstItemIndex + 1,
			lastItemIndex,
			totalItems: data.length
		};
	};

	// Use $derived for calculated values
	const headerGroups = $derived(table.getHeaderGroups());
	const rowModel = $derived(table.getRowModel());
	const selectedCount = $derived(Object.keys(rowSelection).length);
	const paginationInfo = $derived(getPaginationInfo());

	// Toggle row selection
	function toggleRowSelection(row, isSelected) {
		row.toggleSelected(isSelected);
	}

	// Toggle all rows selection
	function toggleAllRowsSelection(isSelected) {
		table.toggleAllRowsSelected(isSelected);
	}
</script>

<div class="container py-10">
	<h1 class="mb-4 text-2xl font-bold">Data Table Example</h1>

	<div class="flex items-center justify-between py-4">
		<Input
			placeholder="Filter all columns..."
			value={globalFilter}
			oninput={(e) => (globalFilter = e.currentTarget.value)}
			class="max-w-sm"
		/>
		{#if selectedCount > 0}
			<div class="text-sm text-muted-foreground">
				{selectedCount} of {data.length} row(s) selected.
			</div>
		{/if}
	</div>

	<div class="rounded-md border">
		<Table>
			<TableHeader>
				{#each headerGroups as headerGroup}
					<TableRow>
						{#each headerGroup.headers as header}
							<TableHead>
								{#if header.column.id === 'select'}
									<div class="px-1">
										<Checkbox
											checked={table.getIsAllRowsSelected()}
											indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
											oncheckedchange={(checked) => toggleAllRowsSelection(!!checked)}
											aria-label="Select all"
										/>
									</div>
								{:else if header.column.getCanSort()}
									<Button
										variant="ghost"
										onclick={() =>
											header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
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
				{#each rowModel.rows as row}
					<TableRow class={row.getIsSelected() ? 'bg-muted/50' : ''}>
						{#each row.getVisibleCells() as cell}
							<TableCell>
								{#if cell.column.id === 'select'}
									<div class="px-1">
										<Checkbox
											checked={row.getIsSelected()}
											oncheckedchange={(checked) => toggleRowSelection(row, !!checked)}
											aria-label="Select row"
										/>
									</div>
								{:else}
									{cell.getValue()}
								{/if}
							</TableCell>
						{/each}
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>

	<div class="flex items-center justify-between space-x-2 py-4">
		<div class="text-sm text-muted-foreground">
			Showing {paginationInfo.firstItemIndex} to {paginationInfo.lastItemIndex} of
			{paginationInfo.totalItems} entries
		</div>
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				onclick={() => table.setPageIndex(0)}
				disabled={pagination.pageIndex === 0}
			>
				<span class="sr-only">Go to first page</span>
				<ChevronsLeft class="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				onclick={() => table.previousPage()}
				disabled={pagination.pageIndex === 0}
			>
				<span class="sr-only">Go to previous page</span>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				onclick={() => table.nextPage()}
				disabled={pagination.pageIndex >= paginationInfo.pageCount - 1}
			>
				<span class="sr-only">Go to next page</span>
				<ChevronRight class="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				class="h-8 w-8 p-0"
				onclick={() => table.setPageIndex(paginationInfo.pageCount - 1)}
				disabled={pagination.pageIndex >= paginationInfo.pageCount - 1}
			>
				<span class="sr-only">Go to last page</span>
				<ChevronsRight class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
