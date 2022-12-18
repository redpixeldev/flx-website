import Alpine from "alpinejs";
import focus from "@alpinejs/focus";

Alpine.plugin(focus);

Alpine.store("mobileMenu", {
	isOpen: false,

	toggle() {
		this.isOpen = !this.isOpen;
	},

	close() {
		this.isOpen = false;
	},
});

window.Alpine = Alpine;

Alpine.start();
