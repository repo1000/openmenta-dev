<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Mail, ChevronRight, LoaderCircle } from 'lucide-svelte';
</script>

<div class="space-y-4 p-4">
	<!-- Primary -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Primary</h2>
		<Button>Default</Button>
	</div>

	<!-- Secondary -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Secondary</h2>
		<Button variant="secondary">Secondary</Button>
	</div>

	<!-- Destructive -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Destructive</h2>
		<Button variant="destructive">Destructive</Button>
	</div>

	<!-- Outline -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Outline</h2>
		<Button variant="outline">Outline</Button>
	</div>

	<!-- Ghost -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Ghost</h2>
		<Button variant="ghost">Ghost</Button>
	</div>

	<!-- Link -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Link</h2>
		<Button variant="link">Link</Button>
	</div>

	<!-- With Icon -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">With Icon</h2>
		<Button>
			<Mail class="mr-2 size-4" />
			Login with Email
		</Button>
	</div>

	<!-- Icon Button -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Icon Button</h2>
		<Button variant="outline" size="icon">
			<ChevronRight class="size-4" />
		</Button>
	</div>

	<!-- Loading -->
	<div class="space-y-2">
		<h2 class="text-lg font-semibold">Loading</h2>
		<Button disabled>
			<LoaderCircle class="mr-2 size-4 animate-spin" />
			Please wait
		</Button>
	</div>
</div>
