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
	import { Button } from '$lib/components/ui/button';
	import BasicTable from './basic-table.svelte';

	// Define table data with $state for reactivity
	const data = $state([
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
	]);
</script>

<div class="container py-10">
	<h1 class="mb-6 text-3xl font-bold">Svelte 5 Tables</h1>

	<div class="mb-12">
		<h2 class="mb-4 text-xl font-semibold">Basic Table Example</h2>
		<p class="mb-4 text-muted-foreground">
			A minimal table example using Svelte 5 syntax with searchable functionality
		</p>
		<BasicTable />
	</div>
</div>
