<script>
	let { price } = $props();

	function currFormat() {
		price = parseFloat(price)?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	}

	currFormat();
</script>

<p>
	{price}
</p>
