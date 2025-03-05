<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value = $state<DateValue | undefined>();
	let contentRef = $state<HTMLElement | null>(null);
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({
				variant: 'outline',
				class: 'w-[280px] justify-start text-left font-normal'
			}),
			!value && 'text-muted-foreground'
		)}
	>
		<CalendarIcon class="mr-2 size-4" />
		{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
	</Popover.Trigger>

	<Popover.Content bind:ref={contentRef} class="w-auto p-0">
		<Calendar type="single" bind:value initialFocus />
	</Popover.Content>
</Popover.Root>
