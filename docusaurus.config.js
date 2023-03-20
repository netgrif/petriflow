// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Petriflow',
	tagline: 'Next-generation end-to-end low code language',
	url: 'https://petriflow.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',

	organizationName: 'netgrif',
	projectName: 'petriflow',

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					path: 'docs',
					routeBasePath: 'docs',
					sidebarPath: require.resolve('./src/sidebars/docs.sidebars.js')
				},
				blog: {
					showReadingTime: true
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	plugins: [
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'action-api',
				path: 'action-api',
				routeBasePath: 'action-api',
				sidebarPath: require.resolve('./src/sidebars/actions.sidebars.js')
			}
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'examples',
				path: 'examples',
				routeBasePath: 'examples',
				sidebarPath: require.resolve('./src/sidebars/examples.sidebars.js')
			}
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'guides',
				path: 'guides',
				routeBasePath: 'guides',
				sidebarPath: require.resolve('./src/sidebars/guides.sidebars.js')
			}
		],
		[
			'@docusaurus/plugin-content-docs',
			{
				id: 'community',
				path: 'community',
				routeBasePath: 'community',
				sidebarPath: require.resolve('./src/sidebars/community.sidebars.js')
			}
		],
	],

	themeConfig:
	/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Petriflow',
				logo: {
					alt: 'Petriflow Logo',
					src: 'img/logo.png',
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Documentation',
					},
					{
						type: "doc",
						docId: 'action-api',
						position: "left",
						label: 'Actions API',
						docsPluginId: 'action-api'
					},
					{
						type: "doc",
						docId: 'examples',
						position: "left",
						label: 'Examples',
						docsPluginId: 'examples'
					},
					{
						type: "doc",
						docId: 'guides',
						position: "left",
						label: 'Guidelines',
						docsPluginId: 'guides'
					},
					{
						type: "doc",
						docId: 'community',
						position: "left",
						label: 'Community',
						docsPluginId: 'community'
					},
					{
						to: '/blog',
						label: 'News',
						position: 'left'
					},
					{
						type: 'docsVersionDropdown',
						position: 'right'
					},
					{
						type: 'dropdown',
						label: 'Tools',
						position: 'right',
						items: [
							{
								label: 'Application Builder',
								href: 'https://builder.netgrif.com'
							},
							{
								label: 'Process modeler',
								href: 'https://startit.sk/modeler'
							},
							{
								label: 'Application Engine',
								href: 'https://engine.netgrif.com'
							},
						]
					},
					{
						href: 'https://github.com/netgrif/petriflow',
						label: 'GitHub',
						position: 'right',
					},
				],
				hideOnScroll: true
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Get Started',
								to: '/docs/intro',
							},
							{
								label: 'Fundamentals',
								to: '/docs/core',
							},
							{
								label: 'Search and filters',
								to: '/docs/search',
							},
							{
								label: 'Actions',
								to: '/action-api',
							},
							{
								label: 'Guidelines',
								to: '/guides',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Stack Overflow',
								href: 'https://stackoverflow.com/questions/tagged/petriflow',
							},
							{
								label: 'LinkedIn',
								href: 'https://www.linkedin.com/company/netgrif/',
							},
							{
								label: 'Twitter',
								href: 'https://twitter.com/netgrif',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'News',
								to: '/blog',
							},
							{
								label: 'GitHub',
								href: 'https://github.com/netgrif/petriflow',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} NETGRIF, s.r.o. Built with Docusaurus.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			docs: {
				sidebar: {
					hideable: true
				}
			}
		}),
};

module.exports = config;
