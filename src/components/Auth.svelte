<script lang="ts">
	import { user } from '$/hooks/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($user === null) {
			$user = localStorage.getItem('token');
		}
	});
</script>
