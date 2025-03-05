<script lang="ts">
	import * as Table from '$lib/components/ui/table';
</script>

<div class="container py-10">
	<h1 class="mb-4 text-2xl font-bold tracking-tight">Table Example</h1>

	<Table.Table>
		<Table.TableCaption>A list of your recent invoices.</Table.TableCaption>
		<Table.TableHeader>
			<Table.TableRow>
				<Table.TableHead class="w-[100px]">Invoice</Table.TableHead>
				<Table.TableHead>Status</Table.TableHead>
				<Table.TableHead>Method</Table.TableHead>
				<Table.TableHead class="text-right">Amount</Table.TableHead>
			</Table.TableRow>
		</Table.TableHeader>
		<Table.TableBody>
			<Table.TableRow>
				<Table.TableCell class="font-medium">INV001</Table.TableCell>
				<Table.TableCell>Paid</Table.TableCell>
				<Table.TableCell>Credit Card</Table.TableCell>
				<Table.TableCell class="text-right">$250.00</Table.TableCell>
			</Table.TableRow>
			<Table.TableRow>
				<Table.TableCell class="font-medium">INV002</Table.TableCell>
				<Table.TableCell>Pending</Table.TableCell>
				<Table.TableCell>PayPal</Table.TableCell>
				<Table.TableCell class="text-right">$150.00</Table.TableCell>
			</Table.TableRow>
			<Table.TableRow>
				<Table.TableCell class="font-medium">INV003</Table.TableCell>
				<Table.TableCell>Unpaid</Table.TableCell>
				<Table.TableCell>Bank Transfer</Table.TableCell>
				<Table.TableCell class="text-right">$350.00</Table.TableCell>
			</Table.TableRow>
			<Table.TableRow>
				<Table.TableCell class="font-medium">INV004</Table.TableCell>
				<Table.TableCell>Paid</Table.TableCell>
				<Table.TableCell>Credit Card</Table.TableCell>
				<Table.TableCell class="text-right">$450.00</Table.TableCell>
			</Table.TableRow>
			<Table.TableRow>
				<Table.TableCell class="font-medium">INV005</Table.TableCell>
				<Table.TableCell>Paid</Table.TableCell>
				<Table.TableCell>PayPal</Table.TableCell>
				<Table.TableCell class="text-right">$550.00</Table.TableCell>
			</Table.TableRow>
			<Table.TableRow>
				<Table.TableCell class="font-medium">INV006</Table.TableCell>
				<Table.TableCell>Pending</Table.TableCell>
				<Table.TableCell>Bank Transfer</Table.TableCell>
				<Table.TableCell class="text-right">$200.00</Table.TableCell>
			</Table.TableRow>
			<Table.TableRow>
				<Table.TableCell class="font-medium">INV007</Table.TableCell>
				<Table.TableCell>Unpaid</Table.TableCell>
				<Table.TableCell>Credit Card</Table.TableCell>
				<Table.TableCell class="text-right">$300.00</Table.TableCell>
			</Table.TableRow>
		</Table.TableBody>
		<Table.TableFooter>
			<Table.TableRow>
				<Table.TableCell colSpan={3}>Total</Table.TableCell>
				<Table.TableCell class="text-right">$2,250.00</Table.TableCell>
			</Table.TableRow>
		</Table.TableFooter>
	</Table.Table>
</div>
