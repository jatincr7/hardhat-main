import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }

  var base64Flag = `data:${user.profileImg.contentType};base64,`;
  var imageStr = arrayBufferToBase64(user.profileImg.data.data);
  var source = base64Flag + imageStr
  // console.log("User ", user)
  return (
    <div>
      Welcome {user.email}!<br />
      <img
        src={source}
        height = {100}
        alt='Helpful alt text'
      />
      <br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
