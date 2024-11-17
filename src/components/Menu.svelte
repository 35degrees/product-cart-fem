<script>
	import Currency from './Currency.svelte';
	import data from '/src/lib/data.json';
</script>

{#snippet card(data)}
	<div class="card flex h-auto w-full flex-col gap-6 md:gap-5">
		<div class="relative w-full">
			<img src={data.image.mobile} alt="menu item" class="rounded-xl" />
			<button
				class="add-btn border-rose400 text-md absolute -bottom-4 left-[50%] flex flex-row items-center justify-center gap-2 rounded-full border-[1px] bg-white px-5 py-2 text-center text-black md:w-3/5 md:gap-1 md:px-4"
			>
				<img src="src/lib/images/icon-add-to-cart.svg" alt="add to cart" />
				<p class="wrap-none lg:text-md inline text-sm">Add to Cart</p>
			</button>
		</div>

		<div class="card-details flex flex-col items-start justify-start">
			<p class="text-rose500 text-sm opacity-80">{data.category}</p>
			<p class="text-md text-rose900 font-bold opacity-90">{data.name}</p>
			<Currency price={data.price} />
		</div>
	</div>
{/snippet}

<div class="container">
	<h1 class="mb-4 text-left text-4xl font-bold text-black">Desserts</h1>
	<div
		class="card-container grid-rows-auto flex flex-col items-center justify-start gap-5 md:grid md:grid-cols-3 md:gap-6"
	>
		{#each data as data, i}
			{@render card(data)}
		{/each}
	</div>
</div>

<style>
	.add-btn {
		transform: translateX(-50%);
	}
</style>
