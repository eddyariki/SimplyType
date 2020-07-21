import React from 'react'
import "./form.css"


class Form extends React.Component{

	renderSPEC_CHAR=()=>{
		const {queryText, handleChange, handleSubmit, typingText} = this.props
		return(
			<div>
			<form action="" name="queries" onSubmit={handleSubmit}>
					<input 
					type="text"
					name="queryText"
					value={queryText}
					onChange={handleChange}
					autoComplete="off"
					/>
				</form>
				<button name="load" onClick={handleSubmit}>Load Text</button>
				<button name="reset" onClick={handleSubmit}>Reset Spec</button>
				<br/>
				<form action="" onSubmit={handleSubmit}>
					<input 
					type="text" 
					name="typingText"
					value={typingText}
					onChange={handleChange}
					/>
				</form>
			</div>
		)
	}


	renderForm =()=>{
		const {gameMode, gameModeEnum, renderSPEC_CHAR} = this.props
		switch(gameMode){
			case gameModeEnum.QUOTE:
				return <div>Quote</div>
			case gameModeEnum.SPEC_CHAR:
				return renderSPEC_CHAR()
			case gameModeEnum.NORMAL:
				return <div>Normal</div>
			default:
				return <div>Quote</div>
		}
	}
	render(){
		return(
			<div>
				<div className="formContainer">
					<div>
						<button className="gameModeButton" onClick={()=>{
							this.setState({gameMode:this.gameMode.QUOTE})
							this.fetchQuote()
							}}>Quote</button>
						<button className="gameModeButton" onClick={()=>this.setState({gameMode:this.gameMode.SPEC_CHAR})}>Specific Characters</button>
						<button className="gameModeButton" onClick={()=>this.setState({gameMode:this.gameMode.NORMAL})}>Normal</button>
						<button onClick={()=>console.log(this.state)}>state</button>
					</div>
					{this.renderForm()}
				</div>
			</div>
		)
	}
}

export default Form