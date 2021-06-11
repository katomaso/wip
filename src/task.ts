import {LitElement, html, css} from 'lit'
import Duration from './duration'

export default class Task extends LitElement {

	title: string
	text: string
	delay: Duration // delay before this step is reminded
	remind: Duration[] // durations in form of "1d", "10s" or "5h"

	followup: Task

	// runtime variables (serialized?)
	started: Date
	paused: boolean
	delayed: Duration

	constructor() {
		super()
		this.paused = false;
	}

	static get properties() {
		return {
			name: {type: String}
		}
	}

	static get styles() {
		return css`
			h2 > input {
				border: none;
				display: block;
				font-size: 13pt;
				font-family: Arial;
			}
		`
	}

	updateTitle(e: InputEvent) {
		e.stopPropagation()
		console.log(e.returnValue)
	}

	static fromJSON(data): Task {
		let t = new Task()
		t.title = data.title;
		t.text = data.text;
		t.delay = new Duration(data.delay)
		t.remind = data.remind.map(r => new Duration(r))
		if(data.followup) {
			t.followup = Task.fromJSON(data.followup)
		}
		t.paused = data.paused;
		t.delayed = new Duration(data.delayed)
		return t
	}

	render() {
		return html`
			<h2><input type="text" @change=${this.updateTitle}>${this.title}</input></h2>
			<slot>${this.text}</slot>
		`
	}
}

customElements.define('task-item', Task);