<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Switch from '$lib/components/ui/switch';
	import { LoaderCircle } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, enhance, errors, delayed, reset } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid && form.message) {
				toast.success('Account settings updated');
			}
		}
	});

	// Convert string notification values to a more readable format
	const notificationLabels = {
		all: 'All notifications',
		mentions: 'Only mentions',
		none: 'No notifications'
	};

	function handleReset() {
		reset();
	}
</script>

<div class="container mx-auto max-w-3xl py-10">
	<Card.Card>
		<Card.CardHeader>
			<Card.CardTitle>Account Settings</Card.CardTitle>
			<Card.CardDescription>Update your account information and preferences</Card.CardDescription>
		</Card.CardHeader>
		<Card.CardContent>
			<form method="POST" class="space-y-8" use:enhance>
				<div class="space-y-6">
					<div class="space-y-2">
						<div class="space-y-1">
							<Label for="username">Username</Label>
							<Input
								id="username"
								name="username"
								bind:value={$form.username}
								placeholder="Enter your username"
							/>
							<p class="text-sm text-muted-foreground">This is your public username.</p>
						</div>
						{#if $errors.username}
							<p class="text-sm text-destructive">{$errors.username}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<div class="space-y-1">
							<Label for="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								bind:value={$form.email}
								placeholder="Enter your email"
							/>
							<p class="text-sm text-muted-foreground">
								We'll never share your email with anyone else.
							</p>
						</div>
						{#if $errors.email}
							<p class="text-sm text-destructive">{$errors.email}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<div class="space-y-1">
							<Label for="bio">Bio</Label>
							<Textarea
								id="bio"
								name="bio"
								bind:value={$form.bio}
								placeholder="Tell us a little about yourself"
								rows={4}
							/>
							<p class="text-sm text-muted-foreground">
								Brief description for your profile. Max 500 characters.
							</p>
						</div>
						{#if $errors.bio}
							<p class="text-sm text-destructive">{$errors.bio}</p>
						{/if}
					</div>

					<Separator />

					<div class="space-y-2">
						<div class="space-y-1">
							<Label>Notification Preferences</Label>
							<div class="mt-2">
								<RadioGroup.Root
									bind:value={$form.notifications}
									name="notifications"
									class="flex flex-col space-y-3"
								>
									{#each Object.entries(notificationLabels) as [value, label]}
										<div class="flex items-center space-x-2">
											<RadioGroup.Item {value} id={`notification-${value}`} />
											<Label for={`notification-${value}`} class="font-normal">
												{label}
											</Label>
										</div>
									{/each}
								</RadioGroup.Root>
							</div>
							<p class="text-sm text-muted-foreground">
								Select how you'd like to receive notifications.
							</p>
						</div>
						{#if $errors.notifications}
							<p class="text-sm text-destructive">{$errors.notifications}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<div class="space-y-1">
								<Label for="twoFactor">Two-Factor Authentication</Label>
								<p class="text-sm text-muted-foreground">
									Enable two-factor authentication for increased security.
								</p>
							</div>
							<Switch.Root bind:checked={$form.twoFactor} name="twoFactor" id="twoFactor" />
						</div>
						{#if $errors.twoFactor}
							<p class="text-sm text-destructive">{$errors.twoFactor}</p>
						{/if}
					</div>
				</div>

				<div class="flex justify-end space-x-4">
					<Button type="button" variant="outline" onclick={handleReset}>Reset</Button>
					<Button type="submit" disabled={$delayed}>
						{#if $delayed}
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							Saving...
						{:else}
							Save Changes
						{/if}
					</Button>
				</div>
			</form>
		</Card.CardContent>
	</Card.Card>
</div>
