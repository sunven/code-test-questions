import { callFunction } from '../../utils/cloudUtil'

export default class UseCollection {
  subject: string
  data: [{ subject: string; index: number }]
  constructor(subject: string) {
    this.subject = subject
    this.getCollection()
  }

  isCollection(index: number) {
    return this.data.some(c => c.index === index)
  }

  getCollection() {
    return callFunction('getCollection', { subject: this.subject }).then(data => {
      this.data = data
    })
  }
  onCollection(index: number) {
    return callFunction('addCollection', { subject: this.subject, index })
  }
}
