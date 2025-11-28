importScripts("/p/ultraviolet/uv/uv.sw.js");
importScripts("/p/ultraviolet/uv/uv.config.js");
importScripts("/p/ultraviolet/uv/uv.bundle.js");

const uv = new UVServiceWorker();

async function handleRequest(event) {
	if (uv.route(event)) {
		return await uv.fetch(event);
	}

	return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event));
});
