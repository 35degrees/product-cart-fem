<script>
	import CartItem from './CartItem.svelte';
	import Modal from './Modal.svelte';
	import { slide } from 'svelte/transition';
	let { cartItems = $bindable() } = $props();
</script>

<style>
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
