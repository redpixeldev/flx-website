module.exports = (eleventyConfig) => {
	const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
	const Image = require("@11ty/eleventy-img");
	const path = require("path");

	eleventyConfig.setServerOptions({
		domdiff: false,
		showAllHosts: true,
	})

	eleventyConfig.addPlugin(EleventyVitePlugin, {
		tempFolderName: ".11ty-vite",
		viteOptions: {
			appType: "custom",
			server: {
				middlewareMode: true,
			},
			build: {
				assetsInlineLimit: 0,
				sourcemap: "true",
				manifest: true,
				rollupOptions: {
					input: path.resolve(__dirname, 'src/assets/js/main.js'),
				}
			}
		},
	});

	async function imageShortcode({
		imgRoot = "./src/assets/images/",
		image,
		alt = " ",
		classes = " ",
		widths = [360, 640, 760, 1000],
		async = true,
		caption,
	}) {
		const source = `${imgRoot}${image}`;
		let metadata = await Image(source, {
			widths,
			formats: ["webp", "jpeg"],
			urlPath: "/cachedImages/",
			outputDir: "./dist/cachedImages/",
			filenameFormat: function (id, src = source, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);

				return `${name}-${width}w.${format}`;
			},
		});

		let imageAttributes = {
			alt,
			width: metadata.jpeg[0].width,
			height: metadata.jpeg[0].height,
			sizes: "100vw",
			class: classes,
			loading: async ? "lazy" : "eager",
			decoding: async ? "async" : "sync",
		};

		const finalImage = Image.generateHTML(metadata, imageAttributes, {
			whitespaceMode: "inline",
		});

		if (caption) {
			return `${finalImage}<span class="text-center text-sm text-gray-500 block mt-1">${caption}</span>`;
		} else {
			return finalImage;
		}
	}

	eleventyConfig.setServerPassthroughCopyBehavior("copy");
	eleventyConfig.addPassthroughCopy("./src/assets/");
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "dist",
		},
	};
};
