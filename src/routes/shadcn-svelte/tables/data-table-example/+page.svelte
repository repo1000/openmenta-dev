<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { ArrowUpDown, MoreHorizontal } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	type Payment = {
		id: string;
		amount: number;
		status: 'pending' | 'processing' | 'success' | 'failed';
		email: string;
		[key: string]: string | number;
	};

	const data: Payment[] = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'success',
			email: 'abe45@gmail.com'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'processing',
			email: 'monserrat44@gmail.com'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'success',
			email: 'silas22@gmail.com'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'failed',
			email: 'carmella@hotmail.com'
		}
	];

	let searchTerm = $state('');
	let sortColumn = $state<string>('email');
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let selectedRows = $state<Set<string>>(new Set());
	let currentPage = $state(0);
	let pageSize = $state(3);

	let filteredData = $derived(
		data.filter(
			(item) =>
				item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
				String(item.amount).includes(searchTerm)
		)
	);

	let sortedData = $derived(
		[...filteredData].sort((a, b) => {
			const aValue = a[sortColumn];
			const bValue = b[sortColumn];

			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return sortDirection === 'asc'
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			} else {
				return sortDirection === 'asc'
					? Number(aValue) - Number(bValue)
					: Number(bValue) - Number(aValue);
			}
		})
	);

	let paginatedData = $derived(
		sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
	);

	let totalPages = $derived(Math.ceil(filteredData.length / pageSize));

	function toggleSort(column: string): void {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'asc';
		}
	}

	function toggleSelectAll(): void {
		if (selectedRows.size === filteredData.length) {
			selectedRows = new Set();
		} else {
			selectedRows = new Set(filteredData.map((item) => item.id));
		}
	}

	function toggleSelectRow(id: string): void {
		if (selectedRows.has(id)) {
			selectedRows.delete(id);
		} else {
			selectedRows.add(id);
		}
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount);
	}

	function getStatusClass(status: string): string {
		switch (status) {
			case 'success':
				return 'text-green-600';
			case 'processing':
				return 'text-blue-600';
			case 'failed':
				return 'text-red-600';
			case 'pending':
				return 'text-yellow-600';
			default:
				return '';
		}
	}
</script>

<div class="container py-10">
	<h1 class="mb-4 text-2xl font-bold tracking-tight">Data Table Example</h1>

	<div>
		<div class="flex items-center py-4">
			<Input placeholder="Search..." class="max-w-sm" bind:value={searchTerm} />
		</div>
		<div class="rounded-md border">
			<Table.Table>
				<Table.TableHeader>
					<Table.TableRow>
						<Table.TableHead class="w-[50px]">
							<Checkbox
								checked={selectedRows.size === filteredData.length && filteredData.length > 0}
								onclick={toggleSelectAll}
							/>
						</Table.TableHead>
						<Table.TableHead class="w-[100px]">ID</Table.TableHead>
						<Table.TableHead>
							<div class="flex items-center space-x-1">
								<span>Status</span>
							</div>
						</Table.TableHead>
						<Table.TableHead>
							<div class="flex items-center space-x-1">
								<span>Email</span>
								<Button
									variant="ghost"
									size="sm"
									class="-ml-3 h-8 data-[state=open]:bg-accent"
									onclick={() => toggleSort('email')}
								>
									<ArrowUpDown class="h-4 w-4" />
								</Button>
							</div>
						</Table.TableHead>
						<Table.TableHead>
							<div class="flex items-center space-x-1">
								<span>Amount</span>
								<Button
									variant="ghost"
									size="sm"
									class="-ml-3 h-8 data-[state=open]:bg-accent"
									onclick={() => toggleSort('amount')}
								>
									<ArrowUpDown class="h-4 w-4" />
								</Button>
							</div>
						</Table.TableHead>
						<Table.TableHead class="w-[50px]">Actions</Table.TableHead>
					</Table.TableRow>
				</Table.TableHeader>
				<Table.TableBody>
					{#each paginatedData as row}
						<Table.TableRow>
							<Table.TableCell>
								<Checkbox
									checked={selectedRows.has(row.id)}
									onclick={() => toggleSelectRow(row.id)}
								/>
							</Table.TableCell>
							<Table.TableCell class="font-medium">{row.id}</Table.TableCell>
							<Table.TableCell>
								<span class={getStatusClass(row.status)}>
									{row.status.charAt(0).toUpperCase() + row.status.slice(1)}
								</span>
							</Table.TableCell>
							<Table.TableCell>{row.email}</Table.TableCell>
							<Table.TableCell>{formatCurrency(row.amount)}</Table.TableCell>
							<Table.TableCell>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Button variant="ghost" size="icon" class="h-8 w-8 p-0">
											<span class="sr-only">Open menu</span>
											<MoreHorizontal class="h-4 w-4" />
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<DropdownMenu.Label>Actions</DropdownMenu.Label>
										<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(row.id)}>
											Copy payment ID
										</DropdownMenu.Item>
										<DropdownMenu.Separator />
										<DropdownMenu.Item>View customer</DropdownMenu.Item>
										<DropdownMenu.Item>View payment details</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.TableCell>
						</Table.TableRow>
					{/each}
				</Table.TableBody>
			</Table.Table>
		</div>
		<div class="flex items-center justify-end space-x-2 py-4">
			<div class="flex-1 text-sm text-muted-foreground">
				{selectedRows.size} of {filteredData.length} row(s) selected.
			</div>
			<div class="space-x-2">
				<Button
					variant="outline"
					size="sm"
					onclick={() => (currentPage = Math.max(0, currentPage - 1))}
					disabled={currentPage === 0}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onclick={() => (currentPage = Math.min(totalPages - 1, currentPage + 1))}
					disabled={currentPage >= totalPages - 1}
				>
					Next
				</Button>
			</div>
		</div>
	</div>
</div>
