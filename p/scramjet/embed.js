const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	prefix: "/p/scramjet/~/",

	files: {
		wasm: '/p/scramjet/crasm/scramjet.wasm.wasm',
		all: '/p/scramjet/crasm/scramjet.all.js',
		sync: '/p/scramjet/crasm/scramjet.sync.js',
	},
});

scramjet.init();



let destination = "";

try {
	destination = new URL(location.hash.slice(1));

	if (!destination.protocol) {
		destination = new URL("https://" + destination.href);
	}
} catch (err) {
	alert(`Bad # string or bad URL. Got error:\n${err}`);
	throw err;
}

registerSW()
	.then(async () => {

		const connection = new BareMux.BareMuxConnection("/bareworker.js");
		const wispURL = "wss://anura.pro/";
		await connection.setTransport("https://unpkg.com/@mercuryworkshop/epoxy-transport@2.1.27/dist/index.mjs", [{ wisp: wispURL }]);


		window.open(
			scramjet.encodeUrl(destination.toString()),
			"_self",
		);
	})
	.catch((err) => {
		alert(`Encountered error:\n${err}`);
	});

