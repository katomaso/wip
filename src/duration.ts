export default class Duration {
	d: number
	h: number
	m: number
	s: number

	constructor(str="") {
		let m = str.match(/(\d+)d/)
		if (m !== null) {
			this.d = parseInt(m[1])
		}
		m = str.match(/(\d+)h/)
		if (m !== null) {
			this.h = parseInt(m[1])
		}
		m = str.match(/(\d+)m/)
		if (m !== null) {
			this.m = parseInt(m[1])
		}
		m = str.match(/(\d+)s/)
		if (m !== null) {
			this.s = parseInt(m[1])
		}
	}

	toString() : string {
		let out = ""
		if (this.d > 0) {
			out += `{this.d}d`
		}
		if (this.h > 0) {
			out += `{this.h}h`
		}
		if (this.m > 0) {
			out += `{this.m}m`
		}
		if (this.s > 0) {
			out += `{this.s}s`
		}
		return out
	}

	toJSON = toString
}