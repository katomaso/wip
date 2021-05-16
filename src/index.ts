import {LitElement, html} from 'lit'
import Duration from './duration'

class WIP extends LitElement {

	name: string
	tasks : Array<Task>
	storage = window.localStorage

	static get properties() {
		return {
			name: {type: String}
		}
	}

	constructor() {
		super()
		this.name = "work"
		this.tasks = []
	}

	connectedCallback() {
		super.connectedCallback()
		this.restore()
	}

	save() {
		this.storage.setItem(this.name, JSON.stringify(this.tasks))
	}

	restore() {
		let data = this.storage.getItem(this.name)
		if (data == null) return;
		let tasks = JSON.parse(data)
		this.tasks = tasks.map(t => Task.fromJSON(t))
	}
}

class Task {

	title: string
	steps: string[]
	delay: Duration // delay before this step is reminded
	remind: Duration[] // durations in form of "1d", "10s" or "5h"

	followup: Task

	// runtime variables (serialized?)
	started: Date
	paused: boolean
	delayed: Duration

	static fromJSON(data): Task {
		let t = new Task()
		t.title = data.title;
		t.steps = data.steps;
		t.delay = new Duration(data.delay)
		t.remind = data.remind.map(r => new Duration(r))
		if(data.followup) {
			t.followup = Task.fromJSON(data.followup)
		}
		t.paused = data.paused;
		t.delayed = new Duration(data.delayed)
		return t
	}
}
