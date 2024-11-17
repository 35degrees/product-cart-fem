<script>
	let { price } = $props();

	function currFormat() {
		price = parseFloat(price)?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	}

	currFormat();
</script>

<p class="text-red text-[1.12rem] font-semibold">
	{price}
</p>
