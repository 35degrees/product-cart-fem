<script>
	import Modal from '../components/Modal.svelte';
	import Menu from '../components/Menu.svelte';
	import Cart from '../components/Cart.svelte';
</script>

<div
	class="container mx-auto flex flex-col items-start justify-start gap-4 border-2 border-slate-400 p-4 lg:grid lg:grid-cols-[68%_30%] lg:grid-rows-1 lg:gap-6"
>
	<Menu />
	<Cart />
	<Modal />
</div>
