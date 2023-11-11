import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import Link

function FriendUI() {

  var friendName ='';
  var friendEmail = '';

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const addFriend = async event =>{
    event.preventDefault();
        
    var obj = {friendname: friendName, friendemail: friendEmail,};
    var js = JSON.stringify(obj);

    try
    {
        const response = await fetch('http://167.172.230.181:5000/users/addfriend',
            {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
        var txt = await response.text();
        var res = JSON.parse(txt);

        console.log(res);

        if(response.status === 200)
        {
            setMessage('Friend has been added');
            navigate('/friend');
        }
        else
        {
            setMessage('An error has occurred ');
        }
    }
    catch(e)
    {
        setMessage(e.toString());
    }
  };

  return(
    <div id="friendUIDiv">
    <br />
    <input type="text" id="friendText" placeholder="Friend To Add"
        ref={(c) => friendName = c} />
    <button type="button" id="addFrienddButton" class="buttons"
        onClick={addFriend}> Add Friend </button><br />
    <span id="friendAddResult">{message}</span>
    </div>
    );

  
}
export default FriendUI;