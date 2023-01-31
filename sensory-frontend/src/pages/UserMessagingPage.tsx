import MessageList from '../components/UserMessaging/MessageList';
import MessageContextProvider from '../contexts/MessageContext';

function Message() {
  return (
    <div className='container-xl'>
      <div className='table-responsive'>
        <div className='table-wrapper'>
          <MessageContextProvider>
            <MessageList />
          </MessageContextProvider>
        </div>
      </div>
    </div>
  );
}

export default Message;
