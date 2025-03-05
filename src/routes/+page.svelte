<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="container py-10">
	<h1 class="mb-6 text-3xl font-bold tracking-tight">Shadcn-Svelte Components</h1>

	<div class="max-w-2xl">
		<p class="mb-6 text-lg text-muted-foreground">
			A collection of reusable components built with Shadcn and Svelte. Browse the component
			categories in the sidebar to explore all available components.
		</p>

		<p class="mb-6 text-muted-foreground">
			Each component is designed to be accessible, customizable, and follows best practices.
		</p>

		<Button href="https://github.com/huntabyte/shadcn-svelte" variant="outline" class="mr-4">
			GitHub
		</Button>
		<Button href="https://next.shadcn-svelte.com/docs">Documentation</Button>
	</div>
</div>
