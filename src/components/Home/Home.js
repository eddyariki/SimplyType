import React from 'react'
import Typing from "../Typing/Typing"
import text from "../../data/words_list.js"
import "./home.css"

class Home extends React.Component{
	state = {
		wordList : null,
		queryText: "",
		typingText: "",
		queryArgs: {
			queries: [],
			wordLength: 6
		},
		queryText: "",
		shownText: "",
		gameMode: "quote",
		quote: "",
		selected: "quote",
		wpm: 0,
		darkMode: true,
	}
	gameMode = {
		QUOTE: "quote",
		SPEC_CHAR: "spec_char",
		NORMAL: "normal"
	}
	colorScheme ={
		dark_primary: "rgba(18, 19, 20,1)",
		dark_ui: "rgba( 37, 44, 49,1)",
		

		bright_primary: "rgba(250,250,250,1)",
		bright_ui: "rgba(224,224,224,1)",
		bright_ui_light: "rgba(234,234,234,1)",
		bright_font_default: "rgba(165,165,165,1)",
		bright_font_active: "rgba(110,110,110,1)",
		bright_font_correct: "rgba(55,55,55,1)",
	}

	componentDidMount(){
		let wordList = text.split("\n")
		this.setState({
			wordList
		})
		this.fetchQuote()
	}

	queryWordList = ()=> {
		const {wordLength, queries} = this.state.queryArgs
		console.log(wordLength, queries)
		const result = this.state.wordList.filter(
			word => {
				if(queries.length>0){
				for(let i=0; i<queries.length; i++){
					if(word.includes(queries[i]) && 1<word.length && word.length <= wordLength){
						return true
					}
				}
				return false
			}else{
					return 1<word.length && word.length <= wordLength
			}
		}
		)
		console.log(result)
		let shownText = ""
		for(let i = 0; i<20; i++){
			let w = result[Math.floor(Math.random() * result.length)]
				shownText+= w + " "
		}
		shownText+="↯"
		this.setState({
			shownText: shownText
		})
		console.log(this.state.shownText)
	}
	checkSize =() =>{
		if(this.state.typingText.length > this.state.shownText.length){
			this.setState({
				shownText: "No More"
			})
		}
	}

	handleChange=e=>{
		const {value, name} = e.target
		if(name==="queryText"&&value.includes(" ")){
			return
		}else if(name==="queryText"){
			this.setState({[name]:value})
		}else{
			this.setState({[name]:value}, this.checkSize)
		}
	}

	handleSubmit=e=>{
		e.preventDefault()
		const {name} = e.target 
		if(name === "load"){

			this.queryWordList()
		}else if(name==='reset'){
			this.setState({
					queryArgs:{
						...this.state.queryArgs,
						queries: []
					}
				})
			console.log(this.state.queryArgs.queries)
		}else{
	
			this.setState({
				queryArgs:{
					...this.state.queryArgs,
					queries: [...this.state.queryArgs.queries, this.state.queryText]
				},
				queryText: ""
			})

		}
	}

	fetchQuote= async () =>{

		const response = await fetch('https://api.quotable.io/random')
		const data = await response.json()
		this.setState({shownText: data.content + " ↯"})
	}




	setSTATS =(wpm, acc)=>{
		this.setState({
			wpm,
			acc: 100-acc,
		})
	}





	renderSPEC_CHAR=()=>{
		return(
			<div 
				className="formInfo"
				style={this.colorMode("border", "solid 1px "+this.colorScheme.dark_ui, "solid 1px "+this.colorScheme.bright_ui)}
			>
			<form action="" name="queries" onSubmit={this.handleSubmit}>
					<input
					className={this.state.darkMode? "queryTextDark": "queryText"}
					style={this.colorMode("backgroundColor", this.colorScheme.dark_ui, this.colorScheme.bright_ui_light)}
					type="text"
					name="queryText"
					value={this.state.queryText}
					onChange={this.handleChange}
					autoComplete="off"
					/>
				</form>
				<div 
					className="queryInput"

				>
				<div style={this.colorMode("color", this.colorScheme.bright_font_default, this.colorScheme.bright_font_active)}>Include these characters: </div>

					{this.state.queryArgs.queries.map((q,id)=>{
						return <div style={this.colorMode("color", this.colorScheme.bright_font_default, this.colorScheme.bright_font_active)} key={id}>"{q}"</div>
					})}
				</div>
				<button 
					className={this.state.darkMode? "gameModeButtonDark":"gameModeButton"}
					id={this.state.darkMode? "gameModeButtonDark": "gameModeButton"} 
					name="load" 
					onClick={this.handleSubmit}
				>
						Load Text
				</button>
				
				<button 
					className={this.state.darkMode? "gameModeButtonDark":"gameModeButton"}
					id={this.state.darkMode? "gameModeButtonDark": "gameModeButton"}
					name="reset" 
					onClick={this.handleSubmit}
				>
					Reset Spec
				</button>
			</div>
		)
	}

















	renderForm =()=>{

		switch(this.state.gameMode){
			case this.gameMode.QUOTE:
				return <div></div>
			case this.gameMode.SPEC_CHAR:
				return this.renderSPEC_CHAR()
			case this.gameMode.NORMAL:
				return <div>Normal</div>
			default:
				return <div></div>
		}
	}

	colorMode=(key,color1,color2)=>{
		return {[key]: this.state.darkMode ? color1: color2}
	}

	render(){
		return(
			<div className="homeContainer" style={this.colorMode("backgroundColor", this.colorScheme.dark_primary, this.colorScheme.bright_primary)}>
				<div className="formContainer" style={this.colorMode("borderLeft", "solid 2px "+this.colorScheme.dark_ui, "solid 2px "+this.colorScheme.bright_ui)}>
					<div className="formInfoContainer">
						<button 
							className={this.state.darkMode? this.state.selected === this.gameMode.QUOTE? "gameModeButtonActiveDark":"gameModeButtonDark": this.state.selected === this.gameMode.QUOTE? "gameModeButtonActive":"gameModeButton"}
							id={this.state.darkMode? "gameModeButtonDark": "gameModeButton"}
							onClick={()=>{
								this.setState({
									gameMode:this.gameMode.QUOTE,
									selected: this.gameMode.QUOTE
								})
								this.fetchQuote()
						}}>Quotes</button>
						<button 
							className={this.state.darkMode? this.state.selected === this.gameMode.SPEC_CHAR? "gameModeButtonActiveDark":"gameModeButtonDark": this.state.selected === this.gameMode.SPEC_CHAR? "gameModeButtonActive":"gameModeButton"}
							id={this.state.darkMode? "gameModeButtonDark": "gameModeButton"}
							onClick={()=>this.setState({
								gameMode:this.gameMode.SPEC_CHAR,
								selected: this.gameMode.SPEC_CHAR
							})}>Specific Characters</button>
						{/*<button className={this.state.selected === this.gameMode.NORMAL? "gameModeButtonActive":"gameModeButton"} onClick={()=>this.setState({gameMode:this.gameMode.NORMAL})}>Normal</button>*/}
						{/*<button onClick={()=>console.log(this.state)}>state</button>*/}
						{this.renderForm()}
					</div>
					<div className="results"
					style={this.colorMode("color", this.colorScheme.bright_font_default, this.colorScheme.bright_font_active)}>
						{this.state.wpm} WPM  <br/>
						{this.state.acc} %
				</div>
				</div>


				<div className="header" style={this.colorMode("backgroundColor", this.colorScheme.dark_primary, this.colorScheme.bright_primary)}>
				Simply Type

				</div>
				
				<div className="switch">
					<div>
						<div className={this.state.darkMode? "darkModeTextDark":"darkModeText"}>Dark Mode</div>
						<div id="switchHov" className={this.state.darkMode? "circleBGDark":"circleBG"}  onClick={()=>this.setState({darkMode:!this.state.darkMode})}><div className={this.state.darkMode? "circleDark":"circle"}></div></div>
					</div>
				</div>


				<div className="typingContainer" style={this.colorMode("backgroundColor", this.colorScheme.dark_primary, this.colorScheme.bright_primary)}>
					<Typing  
					text={this.state.shownText}
					getText={this.queryWordList}
					getQuote={this.fetchQuote}
					gameMode={this.state.gameMode}
					gameModeEnum={this.gameMode}
					setSTATS={this.setSTATS}
					colorScheme={this.colorScheme}
					colorMode={this.colorMode}
					/>
				</div>
			</div>
		)
	}
}

export default Home