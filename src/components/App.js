import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './Home/Home'
const App = () =>{


	return (
		<div>
			<BrowserRouter>
				<div>
					<Route path="/" exact component={Home}/>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App