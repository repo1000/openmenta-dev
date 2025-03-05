<script lang="ts" module>
	import AudioWaveform from 'lucide-svelte/icons/audio-waveform';
	import ChartPie from 'lucide-svelte/icons/chart-pie';
	import Command from 'lucide-svelte/icons/command';
	import Frame from 'lucide-svelte/icons/frame';
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end';
	import Map from 'lucide-svelte/icons/map';
	import Layers from 'lucide-svelte/icons/layers';
	import Table from 'lucide-svelte/icons/table';
	import FileText from 'lucide-svelte/icons/file-text';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import Palette from 'lucide-svelte/icons/palette';
	import Component from 'lucide-svelte/icons/component';

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
				title: 'Shadcn-Svelte',
				url: '#',
				icon: Layers,
				isActive: true,
				items: [
					{
						title: 'Accordion',
						url: '/shadcn-svelte/accordion',
						icon: Component
					},
					{
						title: 'Alert',
						url: '/shadcn-svelte/alert/default',
						icon: AlertCircle
					},
					{
						title: 'Alert Destructive',
						url: '/shadcn-svelte/alert/destructive',
						icon: AlertCircle
					},
					{
						title: 'Alert Dialog',
						url: '/shadcn-svelte/alert-dialog',
						icon: AlertCircle
					},
					{
						title: 'Aspect Ratio',
						url: '/shadcn-svelte/aspect-ratio',
						icon: Component
					},
					{
						title: 'Avatar',
						url: '/shadcn-svelte/avatar',
						icon: Component
					},
					{
						title: 'Badge',
						url: '/shadcn-svelte/badge',
						icon: Component
					},
					{
						title: 'Breadcrumb',
						url: '/shadcn-svelte/breadcrumb',
						icon: Component
					},
					{
						title: 'Button',
						url: '/shadcn-svelte/button',
						icon: Component
					},
					{
						title: 'Command',
						url: '/shadcn-svelte/command',
						icon: Command
					},
					{
						title: 'Combo Box',
						url: '/shadcn-svelte/combo-box',
						icon: Component
					},
					{
						title: 'Context Menu',
						url: '/shadcn-svelte/context-menu',
						icon: Component
					},
					{
						title: 'Date Picker',
						url: '/shadcn-svelte/date-picker',
						icon: Component
					},
					{
						title: 'Drawer',
						url: '/shadcn-svelte/drawer',
						icon: Component
					},
					{
						title: 'Form',
						url: '/shadcn-svelte/form',
						icon: FileText
					},
					{
						title: 'Sidebar',
						url: '/shadcn-svelte/sidebar',
						icon: Component
					},
					{
						title: 'Tables',
						url: '#',
						icon: Table,
						items: [
							{
								title: 'Basic Table',
								url: '/shadcn-svelte/tables/table-example'
							},
							{
								title: 'Data Table',
								url: '/shadcn-svelte/tables/data-table-example'
							},
							{
								title: 'Minimal Table',
								url: '/shadcn-svelte/tables/minimal-table'
							}
						]
					}
				]
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: Frame
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
