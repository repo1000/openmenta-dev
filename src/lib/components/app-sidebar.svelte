<script lang="ts" module>
	import AudioWaveform from 'lucide-svelte/icons/audio-waveform';
	import ChartPie from 'lucide-svelte/icons/chart-pie';
	import Command from 'lucide-svelte/icons/command';
	import Frame from 'lucide-svelte/icons/frame';
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end';
	import Map from 'lucide-svelte/icons/map';
	import Layers from 'lucide-svelte/icons/layers';

	// Define component navigation structure
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		teams: [
			{
				name: 'Acme Inc',
				logo: GalleryVerticalEnd,
				plan: 'Enterprise'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveform,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: Command,
				plan: 'Free'
			}
		],
		navMain: [
			{
				title: 'shadcn-svelte',
				url: '#',
				icon: Layers,
				isActive: true,
				items: [
					{
						title: 'Basic Table',
						url: '/table-example'
					},
					{
						title: 'Data Table',
						url: '/data-table-example'
					},
					{
						title: 'Minimal Table',
						url: '/minimal-table'
					},
					{
						title: 'Accordion',
						url: '/accordion'
					},
					{
						title: 'Aspect Ratio',
						url: '/aspect-ratio'
					},
					{
						title: 'Sidebar',
						url: '/sidebar'
					},
					{
						title: 'Alert',
						url: '/alert'
					},
					{
						title: 'Alert Destructive',
						url: '/alert/destructive'
					},
					{
						title: 'Alert Dialog',
						url: '/alert-dialog'
					},
					{
						title: 'Button',
						url: '/button'
					},
					{
						title: 'Command',
						url: '/command'
					},
					{
						title: 'Combo Box',
						url: '/combo-box'
					},
					{
						title: 'Breadcrumb',
						url: '/breadcrumb'
					},
					{
						title: 'Context Menu',
						url: '/context-menu'
					},
					{
						title: 'Avatar',
						url: '/avatar'
					},
					{
						title: 'Badge',
						url: '/badge'
					}
				]
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: Frame
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPie
			},
			{
				name: 'Travel',
				url: '#',
				icon: Map
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from '$lib/components/nav-main.svelte';
	import NavProjects from '$lib/components/nav-projects.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import TeamSwitcher from '$lib/components/team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
