import {LitElement, html, css} from 'lit'
import Task from './task'

class TaskList extends LitElement {

	name: string
	tasks : Array<any>
	storage = window.localStorage

	static get properties() {
		return {
			name: {type: String}
		}
	}

	constructor() {
		super()
		this.name = "work"
	}

	connectedCallback() {
		super.connectedCallback()
		this.restore()
	}

	save() {
		this.storage.setItem(this.name, JSON.stringify(this.getTasks()))
	}

	getTasks(): NodeListOf<Task> {
		return this.renderRoot.querySelectorAll("task-item");
	}

	restore() {
		let data = this.storage.getItem(this.name)
		if (data == null) return;
		this.tasks = JSON.parse(data)
	}

	render(): any {
		return html`
		${this.tasks.map(task => html`<task-item title="${task.title}">${task.text}</task-item>`)}
		`
	}
}

customElements.define('task-list', TaskList);