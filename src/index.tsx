import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'

import { GameAnalytics } from 'gameanalytics'

import './index.css'
import App from './components/app'
import { Store } from './stores'
import { BoardGeometryType } from './stores/board'
import { CollapseDirection } from './stores/rules'


export const store = Store.create({
	appVersion: '0.0.1',
	board: {
		initialSequenceLength: 36,
		width: 16,
		height: 16,
		geometryType: BoardGeometryType.Spiral,

		movesCount: 0,
		round: 1,
		score: 1000,

		cells: [],
		chain: [],
		sequence: [],
		rules: {
			targetSum: 10,
			targetLength: 2,
			deadPointIndex: 30,
			collapseDirection: CollapseDirection.ToDeadPoint,
			isCollapseRows: true,
			isCollapseColumns: true,
		},
		behavior: {
			seqArrangeStepDelayMs: 15
		}
	}
})

export function runApp() {
	ReactDOM.render(
		<AppContainer>
			<HashRouter>
				<App store={store} />
			</HashRouter>
		</AppContainer>,
		document.getElementById('main')
	)
}

document.addEventListener('DOMContentLoaded', runApp, false)

if (process.env.NODE_ENV !== 'development') {
	GameAnalytics.setEnabledInfoLog(true)
	GameAnalytics.setEnabledVerboseLog(true)
	GameAnalytics.configureBuild(`proto-spiral v${store.appVersion}`)
	GameAnalytics.initialize('b5694a96ea75b08afa06d7921a90e0f1', 'f8817a8de00e142df8a41ef2d6acc562851ff873')
}

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/app', runApp);
}
