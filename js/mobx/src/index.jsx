import {observable, action} from 'mobx'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'

class Store {
    @observable cache = {queue: []}
    @action.bound add() {
        this.cache.queue.push(1)   
    }
}
const store = new Store();
@observer
class Bar extends Component {
   static propTypes = {
       queue: PropTypes.array
   } 
   render() {
        const queue = this.props.queue;
        return <span>{queue.length}</span>
   }
}

@observer
class Foo extends Component {
    static propTypes = {
        cache: PropTypes.object
    } 
    render() {
         const cache = this.props.cache;
         return <div><Bar queue={cache.queue}/><button onClick={this.props.add}>add</button></div>
    }
 }
ReactDOM.render(<Foo cache={store.cache} add={store.add}/>, document.querySelector('#app'))