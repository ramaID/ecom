import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import ReactDOMServer from 'react-dom/server'
import { RouteName } from 'ziggy-js'
import { route } from '../../vendor/tightenco/ziggy/src/js'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`../views/pages/${name}.tsx`, import.meta.glob('../views/pages/**/*.tsx')),
    setup: ({ App, props }) => {
      global.route<RouteName> = (name, params, absolute) =>
        route(name, params as any, absolute, {
          // @ts-expect-error
          ...page.props.ziggy,
          // @ts-expect-error
          location: new URL(page.props.ziggy.location),
        })

      return <App {...props} />
    },
  })
)
