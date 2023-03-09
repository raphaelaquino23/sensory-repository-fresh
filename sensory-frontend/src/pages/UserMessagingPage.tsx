import MessageList from '../components/UserMessaging/MessageList';
import MessageContextProvider from '../contexts/MessageContext';
import MyChatComponent from './TalkJSMessaging';

function Message() {
  return (
    <div className='container-xl'>
      <div className='table-responsive'>
        <div className='table-wrapper'>
          <MessageContextProvider>
            <MessageList />
            <MyChatComponent />
          </MessageContextProvider>
        </div>
      </div>
    </div>
  );
}

export default Message;
