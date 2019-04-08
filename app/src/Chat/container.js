import { connect } from 'react-redux'
import Chat from './Chat.js'
import {addLiveMsg} from './action'


const mapStateToProps = state => ({
  liveMessages: state.liveMessages || []
})

const mapDispatchToProps = dispatch => ({
  addLiveMsg: text => dispatch(addLiveMsg(text))
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat)
