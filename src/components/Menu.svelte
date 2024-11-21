<script>
	import { fade, slide } from 'svelte/transition';
	import Modal from './Modal.svelte';
	import data from '/src/lib/data.json';
	import Currency from './Currency.svelte';

	let cartItems = $state([]);
	let openModal = $state(false);

	let totalQuantity = $derived.by(() => {
		let totalAmt = 0;
		let cartQuantity = 0;
		for (const quantity of cartItems) {
			totalAmt += quantity.total;
			cartQuantity += quantity.quantity;
		}
		return {
			totalAmt,
			cartQuantity
		};
	});

	function addToCart(data) {
		let total = 0;
		let stop = cartItems.find((item) => item.product === data.name);
		if (!stop) {
			cartItems.push({
				product: data.name,
				id: data.number,
				quantity: 1,
				price: data.price,
				total: data.price,
				thumbnail: data.image.thumbnail
			});
		}
	}

	function decrement(i) {
		for (const object of cartItems) {
			if (object.id === i) {
				if (object.quantity === 1) {
					removeItem(object.id);
				} else {
					object.quantity--;
					object.total -= object.price;
				}
			}
		}
	}

	function increment(i) {
		for (let object of cartItems) {
			if (object.id === i) {
				object.quantity++;
				object.total += object.price;
			}
		}
	}

	function getQuantity(i) {
		for (let object of cartItems) {
			if (object.id === i) {
				return object.quantity;
			}
		}
	}

	function removeItem(id) {
		cartItems = cartItems.filter((item) => item.id !== id);
	}

	$inspect(cartItems);
</script>

<!-- {#snippet card(data, i)}
	
{/snippet} -->

<div class="container">
	<h1 class="mb-4 text-left text-4xl font-bold text-black">Desserts</h1>
	<div
		class="card-container grid-rows-auto flex flex-col items-center justify-start gap-5 md:grid md:grid-cols-3 md:gap-6"
	>
		{#each data as data, i}
			<div class="card flex h-auto w-full flex-col gap-6 md:gap-5">
				<div class="relative w-full">
					<img src={data.image.mobile} alt="menu item" class="rounded-xl" />

					{#if cartItems.find((item) => item.id === data.number)}
						<button
							in:fade={{ duration: 120 }}
							out:fade={{ duration: 120 }}
							class="adjust-btn text-md absolute -bottom-4 left-[50%] flex flex-row items-center justify-between gap-2 rounded-full border-[1px] border-rose400 bg-red px-5 py-2 text-center sm:w-[145px] md:w-3/5 md:gap-1 md:px-4"
						>
							<div class="minus-sign" onclick={() => decrement(data.number)}>
								<img src="src/lib/images/icon-decrement-quantity.svg" alt="decrement" />
							</div>
							<p class="wrap-none inline text-sm font-semibold text-white lg:text-[1rem]">
								{getQuantity(data.number)}
							</p>
							<div class="plus-sign" onclick={() => increment(data.number)}>
								<img src="src/lib/images/icon-increment-quantity.svg" alt="increment" />
							</div>
						</button>
					{:else}
						<button
							in:fade={{ duration: 120 }}
							out:fade={{ duration: 120 }}
							onclick={() => addToCart(data)}
							class="add-btn text-md absolute -bottom-4 left-[50%] flex flex-row items-center justify-center gap-2 rounded-full border-[1px] border-rose400 bg-white px-5 py-2 text-center text-black md:w-3/5 md:gap-1 md:px-4"
						>
							<img src="src/lib/images/icon-add-to-cart.svg" alt="add to cart" />
							<p class="wrap-none lg:text-md inline text-sm">Add to Cart</p>
						</button>
					{/if}
				</div>

				<div class="card-details flex flex-col items-start justify-start">
					<p class="text-sm text-rose500 opacity-80">{data.category}</p>
					<p class="text-md font-bold text-rose900 opacity-90">{data.name}</p>
					<p class="text-[0.98rem] font-semibold text-red">
						<Currency price={data.price} />
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<div
	class="container mt-4 flex h-auto w-full flex-col gap-5 rounded-xl bg-white px-8 py-4 md:px-8 lg:m-2 lg:mt-14"
>
	{#if cartItems.length > 0}
		<h1 class="text-2xl font-bold text-red">Your cart ({totalQuantity.cartQuantity})</h1>

		{#each cartItems as item (item.id)}
			<div
				in:slide={{ y: -120, duration: 280 }}
				out:slide={{ y: -420, duration: 200 }}
				class="cart-item relative grid grid-cols-[80%_20%] grid-rows-2 items-center justify-between"
			>
				<div class="col-span-1 row-span-1">
					<p class="text-md font-semibold text-rose900 opacity-70">{item.product}</p>
				</div>
				<div onclick={() => removeItem(item.id)} class="col-span-1 row-span-2">
					<img class="remove-icon" src="src/lib/images/icon-remove-item.svg" alt="" />
				</div>
				<div class="col-span-1 row-span-1">
					<div class="baseline flex flex-row items-center justify-start gap-1">
						<p class="text-[0.95rem] font-semibold text-red">{item.quantity}x</p>
						<p class="flex flex-row gap-1 text-sm font-light text-rose900 opacity-90">
							@ <Currency price={item.price} />
						</p>
						<p class="ml-2 text-[0.98rem] font-bold text-rose900">
							${(item.quantity * item.price).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		{/each}
		<div class="order-total flex flex-row items-end justify-between">
			<p class="text-md font-light text-rose900 opacity-80">Order Total</p>
			<p class="mt-2 text-xl font-bold text-rose900">
				${totalQuantity.totalAmt}{totalQuantity.totalAmt - Math.floor(totalQuantity.totalAmt) === 0
					? '.00'
					: '0'}
			</p>
		</div>

		<div class="flex w-full flex-row items-center justify-center gap-3 rounded-lg bg-rose50 py-3">
			<div class="tree-image color-green">
				<img src="src/lib/images/icon-carbon-neutral.svg" alt="ecotree" />
			</div>
			<p class="text-center text-sm font-normal text-rose900 opacity-90">
				This is a <strong class="font-bold">carbon-neutral </strong> delivery
			</p>
		</div>
		<button
			onclick={() => (openModal = !openModal)}
			class="flex w-full items-center justify-center rounded-full bg-red py-3 hover:opacity-90"
		>
			<p class="text-center font-medium tracking-wide text-white">Confirm Order</p>
		</button>
	{:else}
		<h1 class="text-2xl font-bold text-red">Your cart is empty</h1>
		<div class="image flex justify-center">
			<img src="src/lib/images/illustration-empty-cart.svg" alt="empty cart icon" />
		</div>
		<p class="text-center text-sm font-semibold text-rose500 opacity-90">
			Your added items will appear here.
		</p>
	{/if}
</div>

{#if openModal}
	<Modal bind:cartItems bind:openModal {totalQuantity} />
{/if}

<style>
	.add-btn,
	.adjust-btn {
		transform: translateX(-50%);
	}
	.minus-sign,
	.plus-sign {
		padding: 5px;
		height: 20px;
		width: 20px;
		border: 1px solid #ffffff7b;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover {
			background-color: #ffffff2f;
		}
	}

	.remove-icon {
		height: 1.2rem;
		margin: 2px;
		padding: 3px;
		border-radius: 100%;
		border: 1px solid rgba(0, 0, 0, 0.3);
		display: flex;
		justify-self: flex-end;
		cursor: pointer;
		&:hover {
			border: 1px solid rgba(0, 0, 0, 0.5);
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
	.cart-item::after {
		content: '';
		position: absolute;
		width: 99%;
		height: 1px;
		opacity: 14%;
		bottom: -22%;
		left: 0%;
		background-color: rgba(0, 0, 0, 0.8);
	}
</style>
