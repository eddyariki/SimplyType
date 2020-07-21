import React from 'react'
import './typing.css'

class Typing extends React.Component{
	state = {
		typedText: "",
		shownTextArray: [],
		timer: 0,
	}
	resetState =()=>{
		this.setState({
			typedText: "",
			shownTextArray: [],
			timer: 0
		})
	}
	textRenderer = () =>{
			const shownTextArray = this.props.text.split("")									
			const typedTextArray = this.state.typedText.split("")
			const len = shownTextArray.length
			const {getText, gameMode, gameModeEnum, getQuote} = this.props
				return(
				shownTextArray.map((word,index)=>{
					let ans = typedTextArray[index] === word
					let def = typedTextArray[index] ===undefined
					let active = typedTextArray.length===index
					return(
						<span
						key={index} 
						className={def ? (active? "active" :"default") : (ans? "correct":"incorrect") }
						id="typeBox"
						>
							{word}
						</span>
					)
				})
			)

	}
	handleChange=e=>{
		e.preventDefault()
		const {name, value} = e.target
		const {getText, getQuote, gameMode, gameModeEnum, setSTATS} = this.props
		const shownTextArray = this.props.text.split("")									
		const typedTextArray = this.state.typedText.split("")
		if(shownTextArray.length>0 && typedTextArray.length+2===shownTextArray.length){
			if(gameMode === gameModeEnum.SPEC_CHAR){
					getText()
				}else if(gameMode === gameModeEnum.QUOTE){
					getQuote()
			}
			const len = this.props.text.split(" ").length
			const charlen = shownTextArray.length
			let date = Date.now()
			this.setState({
			typedText: "",
		})

			const wpm = Math.round((len/((date-this.state.timer)/1000))*60).toPrecision(3)
			let wrong = 0
			for(let i=0; i<typedTextArray.length;i++){
				if(typedTextArray[i]!==shownTextArray[i]){
					wrong++
				}
			}
			const acc = ((wrong/charlen)*100).toPrecision(5)
			setSTATS(wpm, acc)
		}else{
			if(this.state.typedText.length === 0){
				let date = Date.now()
				this.setState({
					[name]:value,
					timer: date
					}
				)
			}else{
				this.setState({
					[name]:value
				})}
			}
	}
	render(){
		return(
			<div>
				<div className="typingBox" style={this.props.colorMode("backgroundColor", this.props.colorScheme.dark_primary, this.props.colorScheme.bright_primary)}>
					<form action="" onSubmit={e=>e.preventDefault()}>
						<input 
						className="textField"
						type="text" 
						name="typedText"
						value={this.state.typedText}
						onChange={this.handleChange}
						autoComplete="off"
						spellCheck="false"
						
						autoFocus/>
					</form>
					<div className="textDisplay">
					{this.textRenderer()}
					</div>
				</div>
			</div>
		)
	}
}

export default Typing